<script setup lang="ts">
import { ref } from 'vue'
import { CHAPTERS, getAdjacentChapters } from '~/lib/chapters'
import { useChapterMeta } from '~/composables/useChapterMeta'
import { useSearch } from '~/composables/useSearch'

const { data: doc } = await useAsyncData('schedules', () =>
  queryContent('schedules').findOne()
)

const chapter = computed(() => CHAPTERS.find((c) => c.slug === 'schedules'))
const { title, sectionCount, readTime } = useChapterMeta(doc)
const adjacent = computed(() => getAdjacentChapters('schedules'))
const toc = computed(() => doc.value?.body?.toc?.links ?? [])
const tocOpen = ref(false)

const sections = computed(() => {
  if (!doc.value?.body?.children) return []
  const result: { id: string; title: string; content: string }[] = []
  let current: { id: string; title: string; content: string } | null = null
  for (const node of doc.value.body.children) {
    if (node.tag === 'h2' || node.tag === 'h3') {
      if (current) result.push(current)
      current = { id: node.props?.id || '', title: extractText(node), content: '' }
    } else if (current) {
      current.content += extractText(node) + ' '
    }
  }
  if (current) result.push(current)
  return result
})

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

const { query, matchCount, currentIndex, search, goNext, goPrev, jumpToFirst, clearSearch } = useSearch(sections)

useHead({
  title: 'Schedules | Nigeria Constitution',
  meta: [
    { name: 'description', content: 'Schedules of the 1999 Constitution of the Federal Republic of Nigeria.' },
    { property: 'og:title', content: 'Schedules | Nigeria Constitution' },
    { property: 'og:description', content: 'Schedules of the 1999 Constitution of the Federal Republic of Nigeria.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

defineOgImageComponent('Constitution', {
  label: 'Schedules',
  title: 'Schedules',
  description: 'The 1999 Constitution of the Federal Republic of Nigeria.',
})
</script>

<template>
  <div style="max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;">
    <div style="display: flex; gap: 3rem; padding: 3rem 0;">

      <aside class="hidden lg:block" style="width: 200px; flex-shrink: 0;">
        <TableOfContents v-if="toc.length" :links="toc" />
      </aside>

      <article style="flex: 1; min-width: 0; max-width: 720px;">

        <div style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border);">
          <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); display: block; margin-bottom: 0.75rem;">
            {{ chapter?.label }}
          </span>
          <h1 style="font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 400; color: var(--text-primary); line-height: 1.15; margin: 0 0 1rem;">
            {{ title || 'Schedules' }}
          </h1>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--text-muted);">
            <span>{{ sectionCount }} sections</span>
            <span>·</span>
            <span>~{{ readTime }} min read</span>
            <span v-if="toc.length" class="lg:hidden" style="margin-left: auto;">
              <button class="toc-open-btn" @click="tocOpen = true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="11" y2="18"/>
                </svg>
                Contents
              </button>
            </span>
          </div>
        </div>

        <SearchBar
          :model-value="query"
          :match-count="matchCount"
          :current-index="currentIndex"
          @update:model-value="search"
          @search="search"
          @enter="jumpToFirst"
          @next="goNext"
          @prev="goPrev"
          @clear="clearSearch"
        />

        <div class="prose-content">
          <ContentRenderer v-if="doc" :value="doc" />
        </div>

        <ChapterNav :prev="adjacent.prev" :next="adjacent.next" />
      </article>

      <div class="hidden xl:block" style="width: 160px; flex-shrink: 0;" />
    </div>
  </div>

  <Teleport to="body">
    <div v-if="tocOpen" class="toc-backdrop" @click.self="tocOpen = false">
      <div class="toc-drawer">
        <div class="toc-drawer-head">
          <span class="toc-drawer-title">Contents</span>
          <button class="toc-drawer-close" @click="tocOpen = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <TableOfContents v-if="toc.length" :links="toc" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toc-open-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 5px 10px;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease;
}
.toc-open-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.toc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
.toc-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(280px, 85vw);
  background: var(--bg);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.toc-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.toc-drawer-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}
.toc-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease;
}
.toc-drawer-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
