import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const Pricing: GlobalConfig = {
  slug: 'pricing',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('pricing')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'additional_guest',
      label: 'Additional Guest Price',
      type: 'number',
      min: 0,
      max: 10000,
      defaultValue: 200,
      required: true
    }
  ]
}
