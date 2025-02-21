import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const GeneralAmenities: GlobalConfig = {
  slug: 'general-amenities',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('general-amenities')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'amenity_groups',
      type: 'array',
      fields: [
        {
          name: 'heading',
          label: 'Group name',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 100
        },
        {
          name: 'amenities',
          type: 'relationship',
          relationTo: 'amenities',
          hasMany: true,
          minRows: 1
        }
      ]
    }
  ]
}
