import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

import HeroFields from '../field-groups/hero'
import SEOFields from '../field-groups/seo'
import Facilities from '../field-groups/facilities'

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
