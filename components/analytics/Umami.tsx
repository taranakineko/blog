import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="https://umami.nekoq.eu.org/nya.js" // Replace with your umami instance
        data-do-not-track="true"
        data-domains="taranakineko.pages.dev,nekoq.eu.org"
      />
    </>
  )
}

export default UmamiScript
