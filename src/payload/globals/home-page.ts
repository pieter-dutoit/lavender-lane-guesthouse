import type { GlobalConfig, GroupField } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

import HeroFields from '../field-groups/hero'
import SEOFields from '../field-groups/seo'
import Facilities from '../field-groups/facilities'

const BookingPlatform: GroupField = {
  name: 'booking_platform',
  label: 'Booking Platform',
  type: 'group',
  admin: {
    position: 'sidebar'
  },
  fields: [
    {
      name: 'name',
      type: 'select',
      label: 'Select Platform',
      required: true,
      options: [{ label: 'NightsBridge', value: 'NightsBridge' }]
    },
    {
      name: 'url',
      type: 'text',
      label: 'Booking Link URL',
      required: true
    }
  ]
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('home-page')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    BookingPlatform,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [HeroFields, Facilities]
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: SEOFields
        }
      ]
    }
  ]
}
