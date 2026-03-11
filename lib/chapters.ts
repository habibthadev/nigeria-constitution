export interface ChapterInfo {
  slug: string
  label: string
  short: string
  isSchedule?: boolean
}

export const CHAPTERS: ChapterInfo[] = [
  { slug: 'chapter-i', label: 'Chapter I', short: 'I' },
  { slug: 'chapter-ii', label: 'Chapter II', short: 'II' },
  { slug: 'chapter-iii', label: 'Chapter III', short: 'III' },
  { slug: 'chapter-iv', label: 'Chapter IV', short: 'IV' },
  { slug: 'chapter-v', label: 'Chapter V', short: 'V' },
  { slug: 'chapter-vi', label: 'Chapter VI', short: 'VI' },
  { slug: 'chapter-vii', label: 'Chapter VII', short: 'VII' },
  { slug: 'chapter-viii', label: 'Chapter VIII', short: 'VIII' },
  { slug: 'schedules', label: 'Schedules', short: 'SCH', isSchedule: true },
]

export function getAdjacentChapters(slug: string) {
  const index = CHAPTERS.findIndex((c) => c.slug === slug)
  return {
    prev: index > 0 ? CHAPTERS[index - 1] : null,
    next: index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null,
  }
}

export function getChapterRoute(chapter: ChapterInfo) {
  return chapter.isSchedule ? '/schedules' : `/chapter/${chapter.slug}`
}
