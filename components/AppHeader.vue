<script setup lang="ts">
import { CHAPTERS, getChapterRoute } from '~/lib/chapters'

const route = useRoute()

function isActive(slug: string): boolean {
  const path = route.path
  if (slug === 'schedules') return path === '/schedules'
  return path === `/chapter/${slug}`
}
</script>

<template>
  <header
    class="sticky top-0 z-50"
    style="background: var(--bg); border-bottom: 1px solid var(--border);"
  >
    <div style="max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; height: 52px; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <NuxtLink
        to="/"
        style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; color: var(--text-primary); text-decoration: none; white-space: nowrap; flex-shrink: 0;"
      >
        NigeriaConstitution
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1 overflow-x-auto">
        <NuxtLink
          v-for="chapter in CHAPTERS"
          :key="chapter.slug"
          :to="getChapterRoute(chapter)"
          :class="['chip', isActive(chapter.slug) ? 'active' : '']"
        >
          {{ chapter.short }}
        </NuxtLink>
      </nav>

      <ThemeToggle />
    </div>

    <div
      class="md:hidden overflow-x-auto"
      style="border-top: 1px solid var(--border);"
    >
      <nav style="display: flex; align-items: center; gap: 6px; padding: 8px 1.5rem;">
        <NuxtLink
          v-for="chapter in CHAPTERS"
          :key="chapter.slug"
          :to="getChapterRoute(chapter)"
          :class="['chip', isActive(chapter.slug) ? 'active' : '']"
        >
          {{ chapter.short }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
