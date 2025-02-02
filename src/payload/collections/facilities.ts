import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  access: DEFAULT_COLLECTION_ACCESS,
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Facility Name',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: false,
      maxLength: 500
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
}
