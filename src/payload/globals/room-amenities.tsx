import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const RoomAmenities: GlobalConfig = {
  slug: 'room-amenities',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('room-amenities')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'amenities',
      label: 'Select Amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 100
    }
  ]
}
