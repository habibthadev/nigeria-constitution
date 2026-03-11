export function useChapterMeta(body: any) {
  const title = computed(() => {
    if (!body.value) return ''
    const h2 = body.value?.body?.children?.find(
      (c: any) => c.tag === 'h2'
    )
    if (h2) {
      return extractText(h2)
    }
    return ''
  })

  const sectionCount = computed(() => {
    if (!body.value?.body?.children) return 0
    return body.value.body.children.filter(
      (c: any) => c.tag === 'h3' || c.tag === 'h4'
    ).length
  })

  const readTime = computed(() => {
    if (!body.value?.body?.children) return 0
    const text = extractAllText(body.value.body)
    const words = text.split(/\s+/).length
    return Math.ceil(words / 200)
  })

  const teaser = computed(() => {
    if (!body.value?.body?.children) return ''
    const paragraphs = body.value.body.children.filter(
      (c: any) => c.tag === 'p'
    )
    if (paragraphs.length === 0) return ''
    const firstP = extractText(paragraphs[0])
    const sentences = firstP.split(/\.\s+/)
    return sentences.slice(0, 2).join('. ') + (sentences.length > 0 ? '.' : '')
  })

  return { title, sectionCount, readTime, teaser }
}

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) {
    return node.children.map(extractText).join('')
  }
  return ''
}

function extractAllText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) {
    return node.children.map(extractAllText).join(' ')
  }
  return ''
}
