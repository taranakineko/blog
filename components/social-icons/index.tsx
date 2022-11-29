import Mail from './mail.svg'
import Github from './github.svg'
import Twitter from './twitter.svg'
import Mastodon from './mastodon.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  twitter: Twitter,
  mastodon: Mastodon,
}

const SocialIcon = ({ kind, href }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        style={{ height: '1.5rem', width: '1.5rem' }}
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400`}
      />
    </a>
  )
}

export default SocialIcon
