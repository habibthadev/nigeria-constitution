<script setup lang="ts">
import type { ChapterInfo } from '~/lib/chapters'
import { getChapterRoute } from '~/lib/chapters'

defineProps<{
  prev: ChapterInfo | null
  next: ChapterInfo | null
}>()
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 4rem;">
    <NuxtLink
      v-if="prev"
      :to="getChapterRoute(prev)"
      style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 1rem 1.25rem;
        border-radius: 6px;
        border: 1px solid var(--border);
        background: var(--bg-card);
        text-decoration: none;
        transition: border-color 150ms ease;
      "
      @mouseenter="($el as HTMLElement).style.borderColor = 'var(--accent)'"
      @mouseleave="($el as HTMLElement).style.borderColor = 'var(--border)'"
    >
      <span style="color: var(--text-muted); font-size: 18px; line-height: 1;">←</span>
      <div>
        <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 2px;">Previous</span>
        <span style="font-family: 'Instrument Serif', Georgia, serif; font-size: 15px; color: var(--text-primary);">{{ prev.label }}</span>
      </div>
    </NuxtLink>
    <div v-else />

    <NuxtLink
      v-if="next"
      :to="getChapterRoute(next)"
      style="
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        padding: 1rem 1.25rem;
        border-radius: 6px;
        border: 1px solid var(--border);
        background: var(--bg-card);
        text-decoration: none;
        text-align: right;
        transition: border-color 150ms ease;
      "
      @mouseenter="($el as HTMLElement).style.borderColor = 'var(--accent)'"
      @mouseleave="($el as HTMLElement).style.borderColor = 'var(--border)'"
    >
      <div>
        <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 2px;">Next</span>
        <span style="font-family: 'Instrument Serif', Georgia, serif; font-size: 15px; color: var(--text-primary);">{{ next.label }}</span>
      </div>
      <span style="color: var(--text-muted); font-size: 18px; line-height: 1;">→</span>
    </NuxtLink>
    <div v-else />
  </div>
</template>
