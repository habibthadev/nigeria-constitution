<script setup lang="ts">
import { CHAPTERS, getChapterRoute } from '~/lib/chapters'
</script>

<template>
  <footer style="border-top: 1px solid var(--border); margin-top: 6rem; padding: 3rem 0; background: var(--bg-secondary);">
    <div style="max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;">
      <div
        class="block md:flex"
        style="justify-content: space-between; align-items: flex-start; gap: 3rem; margin-bottom: 2.5rem;"
      >
        <div>
          <p style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-primary); margin-bottom: 0.4rem;">
            Nigeria Constitution
          </p>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 0; line-height: 1.6; max-width: 360px;">
            Built with Vue + Nuxt. Constitution content is public domain.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem;" class="md:mt-0">
          <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.25rem;">
            Attribution
          </span>
          <a
            href="https://habibthadev.tech"
            target="_blank"
            rel="noopener noreferrer"
            style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-secondary); text-decoration: none; transition: color 150ms ease;"
          >
            Built by Habibthadev ↗
          </a>
          <a
            href="https://github.com/mykeels/nigerian-constitution"
            target="_blank"
            rel="noopener noreferrer"
            style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-secondary); text-decoration: none; transition: color 150ms ease;"
          >
            Constitution source data ↗
          </a>
          <a
            href="https://github.com/habibthadev/nigeria-constitution"
            target="_blank"
            rel="noopener noreferrer"
            style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-secondary); text-decoration: none; transition: color 150ms ease;"
          >
            Nigeria Constitution on GitHub ↗
          </a>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: 2rem;">
        <nav style="display: flex; flex-wrap: wrap; gap: 8px;">
          <a
            href="https://github.com/habibthadev/nigeria-constitution"
            target="_blank"
            rel="noopener noreferrer"
            class="chip"
          >
            GitHub ↗
          </a>
          <NuxtLink
            v-for="chapter in CHAPTERS"
            :key="chapter.slug"
            :to="getChapterRoute(chapter)"
            class="chip"
          >
            {{ chapter.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
