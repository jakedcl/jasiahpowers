export function plainText(value) {
  if (!value) return ''
  if (typeof value === 'string') return value.trim()
  if (!Array.isArray(value)) return ''
  return value
    .filter((block) => block?._type === 'block')
    .map((block) =>
      (block.children || []).map((child) => child?.text || '').join('')
    )
    .join('\n\n')
    .trim()
}
