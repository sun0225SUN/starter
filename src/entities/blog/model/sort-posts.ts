export function sortPostsByDate<T extends { date: string }>(
  posts: readonly T[],
): T[] {
  return [...posts].sort((left, right) => right.date.localeCompare(left.date))
}
