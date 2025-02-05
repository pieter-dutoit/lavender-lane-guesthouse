import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: DEFAULT_COLLECTION_ACCESS,
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    afterChange: [revalidateCache('reviews')]
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Reviewer Name',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'title',
      type: 'text',
      label: 'Review Title (Optional)',
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Review Text',
      required: true,
      minLength: 1,
      maxLength: 1000
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (1 to 5)',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5
    },
    {
      name: 'platform',
      type: 'select',
      label: 'Select Platform (Optional)',
      options: [
        'Google',
        'Booking.com',
        'AirBnb',
        'LekkeSlaap',
        'Tripadvisor',
        'Facebook'
      ]
    },
    {
      name: 'link',
      type: 'text',
      label: 'Review Link / URL (Optional)',
      maxLength: 200
    }
  ]
}
