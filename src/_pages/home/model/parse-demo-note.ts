export function parseDemoNote(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return null

  const content = value.trim()

  return content.length > 0 ? content.slice(0, 200) : null
}
