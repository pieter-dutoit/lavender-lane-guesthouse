import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const ContactPersons: CollectionConfig = {
  slug: 'contact-persons',
  labels: {
    singular: 'Contact Person',
    plural: 'Contact Persons'
  },
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    afterChange: [revalidateCache('contact-persons')]
  },
  versions: {
    drafts: true
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Contact Person Full Name (Optional)',
      type: 'text'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true
    },
    {
      name: 'position',
      label: 'Position / Title (Optional)',
      type: 'text',
      required: false
    }
  ]
}
