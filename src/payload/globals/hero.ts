import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const Hero: GlobalConfig = {
  slug: 'hero',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('hero')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Select the Background Image',
      required: true
    }
  ]
}
