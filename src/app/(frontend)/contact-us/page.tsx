import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import ContactDetails from './components/contact-details'
import SocialMedia from './components/social-media'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('contact-us')
  if (!data) return {}
  return createMetadataConfig(data)
}

export default function ContactUsPage() {
  return (
    <>
      <h1 className='sr-only'>We&apos;d love to hear from you</h1>
      <ContactDetails />
      <SocialMedia />
    </>
  )
}
