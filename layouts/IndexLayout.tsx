import siteMetadata from '@/data/siteMetadata'
/* import SectionContainer from '@/components/SectionContainer' */
import { PageSEO } from '@/components/SEO'
import ScrollTop from '@/components/ScrollTop'

export default function IndexLayout({ frontMatter, children }) {
  const { title } = frontMatter

  return (
    <>
      <PageSEO title={title + ` - ` + siteMetadata.author} description={siteMetadata.description} />
      <ScrollTop />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}
