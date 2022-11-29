import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
const DEFAULT_LAYOUT = 'IndexLayoutWithComments'
export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['Links'])
  return { props: { authorDetails } }
}
export default function Index({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails
  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
