const dateLocales: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
}

export function formatPostDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(dateLocales[locale] ?? 'en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
