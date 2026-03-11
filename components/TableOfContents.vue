<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  const headings = document.querySelectorAll('h2[id], h3[id]')
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
  )
  headings.forEach((h) => observer!.observe(h))
})

onUnmounted(() => observer?.disconnect())

function flattenLinks(links: TocLink[]): { id: string; text: string; depth: number }[] {
  const result: { id: string; text: string; depth: number }[] = []
  for (const link of links) {
    result.push({ id: link.id, text: link.text, depth: link.depth })
    if (link.children) result.push(...flattenLinks(link.children))
  }
  return result
}

const flatLinks = computed(() => flattenLinks(props.links))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="toc-nav">
    <span class="label-section">On this page</span>
    <ul class="toc-list">
      <li v-for="link in flatLinks" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="toc-link"
          :class="{ 'toc-link--active': activeId === link.id, 'toc-link--h3': link.depth === 3 }"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-nav {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}
.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.toc-link {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  padding: 4px 0 4px 12px;
  text-decoration: none;
  border-left: 2px solid transparent;
  color: var(--text-muted);
  transition: border-color 150ms ease, color 150ms ease;
}
.toc-link--h3 {
  padding-left: 24px;
}
.toc-link--active {
  border-left-color: var(--accent);
  color: var(--accent);
}
.toc-link:hover:not(.toc-link--active) {
  color: var(--text-secondary);
}
</style>
