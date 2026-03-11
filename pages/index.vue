<script setup lang="ts">
import { CHAPTERS, getChapterRoute } from '~/lib/chapters'

const { data: chapters } = useAsyncData('all-chapters', () =>
  queryContent('/').find()
)

function getChapterTitle(slug: string): string {
  const doc = chapters.value?.find((c) => c._path === `/${slug}`)
  if (!doc?.body?.children) return ''
  const h2 = doc.body.children.find((c: any) => c.tag === 'h2')
  return h2 ? extractText(h2) : ''
}

function getChapterTeaser(slug: string): string {
  const doc = chapters.value?.find((c) => c._path === `/${slug}`)
  if (!doc?.body?.children) return ''
  const paragraphs = doc.body.children.filter((c: any) => c.tag === 'p')
  if (!paragraphs.length) return ''
  const firstP = extractText(paragraphs[0])
  const sentences = firstP.split(/\.\s+/)
  return sentences.slice(0, 2).join('. ') + '.'
}

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

useHead({
  title: 'Nigeria Constitution — The 1999 Constitution, Beautifully Rendered',
  meta: [
    { name: 'description', content: 'The 1999 Constitution of the Federal Republic of Nigeria, as amended. Beautifully rendered. Free. Open source.' },
    { property: 'og:title', content: 'Nigeria Constitution' },
    { property: 'og:description', content: 'The 1999 Constitution of the Federal Republic of Nigeria, as amended. Beautifully rendered. Free. Open source.' },
  ],
})

defineOgImageComponent('Constitution', {
  title: 'Nigeria Constitution',
  description: 'The 1999 Constitution of the Federal Republic of Nigeria, beautifully rendered.',
})

const featureChips = ['in-page search', 'table of contents', 'dark mode', 'light mode', 'deep links', 'open source']

const rawMarkdownSample = `## Chapter I\n\n**36.** Every person shall be entitled\nto freedom of expression, including\nfreedom to hold opinions and to\nreceive and impart ideas and\ninformation without interference.`

const renderedSample = 'Chapter I — Section 36 of the Nigerian Constitution guarantees every person freedom of expression, including freedom to hold opinions and impart ideas without interference.'
</script>

<template>
  <div>
    <section class="hero-section">
      <div class="container">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.75rem;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 256 256"
            fill="currentColor"
            style="color: var(--accent); flex-shrink: 0;"
          >
            <path d="M239.43,133l-32-120A8,8,0,0,0,197.57,9L128,47.42,58.43,9A8,8,0,0,0,48.57,13l-32,120a8,8,0,0,0,2.53,8.13l104,80a8,8,0,0,0,9.8,0l104-80A8,8,0,0,0,239.43,133ZM128,223.07l-96.12-74,29.53-110.73L120,68.58V200a8,8,0,0,0,16,0V68.58l58.59-30.21L224.12,149Z" />
          </svg>
          <h1 class="hero-title">Nigeria Constitution</h1>
        </div>

        <p class="hero-subtitle">
          The 1999 Constitution of the Federal Republic of Nigeria, as amended.
          Beautifully rendered. Free. Open source.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <NuxtLink to="/chapter/chapter-i" class="btn-primary">
            Read Chapter I →
          </NuxtLink>
          <a
            href="https://github.com/habibthadev/nigeria-constitution"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </section>
    <section class="content-section">
      <div class="container">
        <span class="label-section">How it works</span>

        <p class="section-body" style="max-width: 600px; margin-bottom: 2.5rem;">
          The Nigerian Constitution spans 8 chapters and several schedules.
          Each chapter is rendered from source markdown with full hierarchy,
          in-page search, and a navigable table of contents. No paywall. No login.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2.5rem;">
          <NuxtLink
            v-for="chapter in CHAPTERS"
            :key="chapter.slug"
            :to="getChapterRoute(chapter)"
            class="chip"
          >
            {{ chapter.short }}
          </NuxtLink>
        </div>
        <div class="preview-box">
          <div class="preview-header">
            <span class="preview-label">source</span>
            <span style="color: var(--text-muted);">→</span>
            <span class="preview-label" style="color: var(--accent);">rendered</span>
          </div>
          <div class="preview-body">
            <div class="preview-pane preview-pane-left">
              <pre class="preview-code">{{ rawMarkdownSample }}</pre>
            </div>
            <div class="preview-pane">
              <p class="preview-rendered">{{ renderedSample }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content-section">
      <div class="container">
        <span class="label-section">Chapters</span>

        <div class="chapters-grid">
          <ChapterCard
            v-for="chapter in CHAPTERS"
            :key="chapter.slug"
            :chapter="chapter"
            :title="getChapterTitle(chapter.slug)"
            :teaser="getChapterTeaser(chapter.slug)"
          />
        </div>
      </div>
    </section>
    <section class="content-section">
      <div class="container">
        <span class="label-section">Navigate it</span>

        <p class="section-body" style="max-width: 580px; margin-bottom: 2.5rem;">
          Every section has a unique anchor. Append a hash to jump directly to any provision
          and share deep links to specific parts of the constitution.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2rem;">
          <span
            v-for="feature in featureChips"
            :key="feature"
            class="chip"
            style="cursor: default;"
          >
            {{ feature }}
          </span>
        </div>

        <div class="url-bar">
          <span style="color: var(--text-muted);">nigeria-constitution.vercel.app</span><span style="color: var(--accent);">/chapter/chapter-iv</span><span style="color: var(--text-muted);">#section-36</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-section {
  padding: 6rem 0 5.5rem;
  border-bottom: 1px solid var(--border);
}

.content-section {
  padding: 5.5rem 0;
  border-bottom: 1px solid var(--border);
}

.hero-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 6vw, 3.75rem);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
}

.hero-subtitle {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 2.5rem;
}

.section-body {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
}

.btn-primary {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  padding: 9px 20px;
  border-radius: var(--radius);
  background: var(--accent);
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 150ms ease;
  border: 1px solid transparent;
}
.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-ghost {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  padding: 9px 20px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 150ms ease, color 150ms ease;
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.preview-box {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-card);
}

.preview-header {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.preview-body {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .preview-body {
    flex-direction: row;
  }
}

.preview-pane {
  flex: 1;
  padding: 1.5rem;
}

.preview-pane-left {
  border-bottom: 1px solid var(--border);
}

@media (min-width: 768px) {
  .preview-pane-left {
    border-bottom: none;
    border-right: 1px solid var(--border);
  }
}

.preview-code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-muted);
  white-space: pre-wrap;
  margin: 0;
  background: none;
  border: none;
  padding: 0;
}

.preview-rendered {
  font-family: 'Lora', Georgia, serif;
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  margin: 0;
}

.chapters-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--border);
}

@media (min-width: 768px) {
  .chapters-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.url-bar {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
