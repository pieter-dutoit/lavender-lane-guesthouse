import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import PageHeading from '../components/page-heading'
import Overview from './components/overview'
import Story from './components/story'
import Team from './components/team'
import ContactUs from '../components/contact-us'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('about')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/about-us' })
}

export default function AboutPage() {
  return (
    <>
      <PageHeading
        description='Your home away from home in the heart of Kathu.'
        className='bg-gray-100'
      >
        About <span>Lavender Lane</span>
      </PageHeading>
      <Overview />
      <Story />
      <Team />
      <ContactUs />
    </>
  )
}
