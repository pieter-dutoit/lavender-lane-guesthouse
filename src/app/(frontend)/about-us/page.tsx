import { Metadata } from 'next'

import { getContacts, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import { getBusinessStructuredData } from '@/lib/utils/create-structured-data'
import { extractContactDetails } from '@/lib/utils'

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

export default async function AboutPage() {
  const businessData = await getBusinessStructuredData()
  const contactsData = await getContacts()
  const contacts = extractContactDetails(contactsData)

  const jsonLd = {
    ...businessData,
    founder: [
      {
        '@type': 'Person',
        name: 'Mienie du Toit',
        jobTitle: 'Owner'
      },
      {
        '@type': 'Person',
        name: 'Madeleine de Waal',
        jobTitle: 'Owner'
      }
    ],
    employee: {
      '@type': 'Person',
      name: 'Izandri Janse van Vuuren',
      jobTitle: 'Administration'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+27${contacts[0].phoneLink}`,
      email: contacts[0].email,
      contactType: 'customer service',
      availableLanguage: ['English', 'Afrikaans']
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
