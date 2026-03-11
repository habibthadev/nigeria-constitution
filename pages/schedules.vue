<script setup lang="ts">
import { ref } from 'vue'
import { CHAPTERS, getAdjacentChapters } from '~/lib/chapters'
import { useChapterMeta } from '~/composables/useChapterMeta'
import { useSearch } from '~/composables/useSearch'

const { data: doc } = useAsyncData('schedules', () =>
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
  <div class="page-wrap">
    <article class="article-body">

      <div class="chapter-header">
        <span class="chapter-label-accent">{{ chapter?.label }}</span>
        <h1 class="chapter-title">{{ title || 'Schedules' }}</h1>
        <div class="chapter-meta">
          <span>{{ sectionCount }} sections</span>
          <span>·</span>
          <span>~{{ readTime }} min read</span>
          <button v-if="toc.length" class="toc-trigger" @click="tocOpen = true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="11" y2="18"/>
            </svg>
            Contents
          </button>
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

    <div v-if="toc.length" class="toc-fixed">
      <TableOfContents :links="toc" />
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <div v-if="tocOpen" class="toc-overlay" @click.self="tocOpen = false">
        <div class="toc-panel">
          <div class="toc-panel-head">
            <span class="toc-panel-label">Contents</span>
            <button class="toc-panel-close" @click="tocOpen = false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <TableOfContents :links="toc" />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.page-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.article-body {
  width: 100%;
}

.chapter-header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.chapter-label-accent {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  display: block;
  margin-bottom: 0.75rem;
}

.chapter-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 1rem;
}

.chapter-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.toc-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 4px 10px;
  cursor: pointer;
  margin-left: auto;
  transition: border-color 150ms ease, color 150ms ease;
}

.toc-trigger:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toc-fixed {
  display: none;
  position: fixed;
  top: 5rem;
  left: max(1rem, calc(50vw - 380px - 230px));
  width: 210px;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
  z-index: 20;
}

@media (min-width: 1360px) {
  .toc-fixed {
    display: block;
  }
  .toc-trigger {
    display: none;
  }
}

.toc-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.toc-panel {
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

.toc-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.toc-panel-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.toc-panel-close {
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

.toc-panel-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
