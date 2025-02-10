import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import Hero from './components/hero'
import Overview from './components/overview'
import Story from './components/story'
import Team from './components/team'
import ContactUs from '../components/contact-us'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('about')
  if (!data) return {}
  return createMetadataConfig(data)
}

export default function AboutPage() {
  return (
    <>
      <Hero
        heading='About Lavender Lane'
        description='Your home away from home in the heart of Kathu.'
        className='bg-gray-200'
      />
      <Overview />
      <Story />
      <Team />

      <ContactUs />
    </>
  )
}
