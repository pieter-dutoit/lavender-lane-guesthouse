import { Metadata } from 'next'

import { getContacts, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import {
  createBreadCrumbs,
  getBusinessStructuredData
} from '@/lib/utils/create-structured-data'
import { extractContactDetails, getBaseUrl } from '@/lib/utils'

import ContactDetails from './components/contact-details'
import SocialMedia from './components/social-media'
import PageHeading from '../components/page-heading'
import Breadcrumbs from '../components/breadcrumbs'

const CRUMBS = [{ name: 'Contact Us', item: '/contact-us' }]

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('contact-us')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/contact-us' })
}

export default async function ContactUsPage() {
  const businessData = await getBusinessStructuredData()
  const contactsData = await getContacts()
  const contacts = extractContactDetails(contactsData)
  const metadata = await getSEOConfig('contact-us')

  const jsonLd = [
    createBreadCrumbs(CRUMBS),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: metadata.open_graph.title,
      description: metadata.meta.description,
      url: `${getBaseUrl()}/contact`,
      about: {
        ...businessData,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+27${contacts[0].phoneLink}`,
          email: contacts[0].email,
          contactType: 'customer service',
          availableLanguage: ['English', 'Afrikaans']
        }
      }
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs crumbs={CRUMBS} />
      <PageHeading className='sr-only bg-gradient-to-b from-white to-gray-100'>
        We&apos;d love to <span>hear from you</span>
      </PageHeading>
      <ContactDetails />
      <SocialMedia />
    </>
  )
}
