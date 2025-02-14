import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import ContactDetails from './components/contact-details'
import SocialMedia from './components/social-media'
import PageHeading from '../components/page-heading'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('contact-us')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/contact-us' })
}

export default function ContactUsPage() {
  return (
    <>
      <PageHeading className='sr-only bg-gradient-to-b from-white to-gray-100'>
        We&apos;d love to <span>hear from you</span>
      </PageHeading>
      <ContactDetails />
      <SocialMedia />
    </>
  )
}
