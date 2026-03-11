import { ref, computed, nextTick } from 'vue'
import Fuse from 'fuse.js'
import type { Ref } from 'vue'

interface SearchSection {
  id: string
  title: string
  content: string
}

export function useSearch(sections: Ref<SearchSection[]>) {
  const query = ref('')
  const resultIds = ref<string[]>([])
  const currentIndex = ref(0)

  const fuse = computed(() => new Fuse(sections.value, {
    keys: ['title', 'content'],
    threshold: 0.3,
    includeMatches: true,
    minMatchCharLength: 3,
  }))

  const matchCount = computed(() => resultIds.value.length)
  const matchingSectionIds = computed(() => new Set(resultIds.value))

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function scrollToIndex(index: number) {
    const id = resultIds.value[index]
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('search-active-heading')
    setTimeout(() => el.classList.remove('search-active-heading'), 1800)
  }

  function applyHighlights() {
    if (typeof document === 'undefined') return
    document.querySelectorAll('.section-search-match').forEach(el =>
      el.classList.remove('section-search-match')
    )
    resultIds.value.forEach(id => {
      document.getElementById(id)?.classList.add('section-search-match')
    })
  }

  function search(value: string) {
    query.value = value
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      if (!value || value.length < 3) {
        resultIds.value = []
        currentIndex.value = 0
        applyHighlights()
        return
      }
      resultIds.value = fuse.value.search(value).map(r => r.item.id)
      currentIndex.value = 0
      nextTick(() => {
        applyHighlights()
        scrollToIndex(0)
      })
    }, 200)
  }

  function goNext() {
    if (!resultIds.value.length) return
    currentIndex.value = (currentIndex.value + 1) % resultIds.value.length
    scrollToIndex(currentIndex.value)
  }

  function goPrev() {
    if (!resultIds.value.length) return
    currentIndex.value = (currentIndex.value - 1 + resultIds.value.length) % resultIds.value.length
    scrollToIndex(currentIndex.value)
  }

  function jumpToFirst() {
    if (!resultIds.value.length) return
    currentIndex.value = 0
    scrollToIndex(0)
  }

  function clearSearch() {
    query.value = ''
    resultIds.value = []
    currentIndex.value = 0
    applyHighlights()
  }

  return {
    query,
    matchCount,
    matchingSectionIds,
    currentIndex,
    search,
    goNext,
    goPrev,
    jumpToFirst,
    clearSearch,
  }
}
