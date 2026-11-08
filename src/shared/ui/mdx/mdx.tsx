import { MDXRemote } from 'next-mdx-remote/rsc'

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} />
}
