import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16 mb-8">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          <SocialIcon kind="mastodon" href={siteMetadata.mastodon} />
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="https://r00ks.io"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {siteMetadata.author}
          </Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/Austionian/blog.r00ks"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Source Code
          </Link>
          {` • `}
          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            采用 CC BY-NC-SA 4.0 协议.
          </Link>
        </div>
      </div>
    </footer>
  )
}
