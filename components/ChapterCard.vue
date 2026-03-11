<script setup lang="ts">
import type { ChapterInfo } from '~/lib/chapters'
import { getChapterRoute } from '~/lib/chapters'

const props = defineProps<{
  chapter: ChapterInfo
  title: string
  teaser: string
}>()

const route = computed(() => getChapterRoute(props.chapter))
</script>

<template>
  <NuxtLink :to="route" class="chapter-card">
    <span class="card-label">{{ chapter.label }}</span>
    <span class="card-title">{{ title || chapter.label }}</span>
    <span class="card-teaser">{{ teaser }}</span>
    <span class="card-link">Read →</span>
  </NuxtLink>
</template>

<style scoped>
.chapter-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--bg-card);
  text-decoration: none;
  transition: background 150ms ease;
  border: 1px solid transparent;
  transition: border-color 150ms ease;
}
.chapter-card:hover {
  border-color: var(--accent);
}
.card-label {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.card-title {
  display: block;
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.625rem;
  line-height: 1.3;
}
.card-teaser {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-muted);
  margin-bottom: 1rem;
  flex: 1;
}
.card-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 150ms ease;
}
.chapter-card:hover .card-link {
  color: var(--accent);
}
</style>
