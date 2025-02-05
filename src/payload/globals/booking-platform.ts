import { GlobalConfig } from 'payload'
import revalidateCache from '../hooks/globals/revalidate-cache'
import { isLoggedInOrIsPublished } from '../access/is-logged-in-or-is-published'
import { isLoggedIn } from '../access/is-logged-in'

export const BookingPlatform: GlobalConfig = {
  slug: 'booking-platform',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('booking-platform')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
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
