import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const Logos: GlobalConfig = {
  slug: 'logos',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('logos')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo (Used in navbar and footer)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    }
  ]
}
