import { CollectionConfig, GroupField } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

const MetadataField: GroupField = {
  interfaceName: 'MetadataField',
  name: 'meta',
  label: 'Meta Fields (For SEO optimisation)',
  type: 'group',
  fields: [
    {
      name: 'title',
      label:
        'Page Title (Shows in the browser tab and search results) (Up to 70 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 70,
      required: true
    },
    {
      name: 'description',
      label:
        'Description (Shows in search results) (Ideally 100 to 200 characters)',
      type: 'textarea',
      required: true,
      minLength: 70,
      maxLength: 200
    }
  ]
}

const OpenGraphField: GroupField = {
  interfaceName: 'OpenGraphField',
  name: 'open_graph',
  label: 'Open Graph Fields (How shared links appear on social media)',
  type: 'group',
  fields: [
    {
      name: 'site_name',
      label: 'Site Name (Up to 200 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 200,
      required: true,
      defaultValue: 'Lavender Lane Guesthouse'
    },
    {
      name: 'title',
      label: 'Title (Up to 70 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 70,
      required: true
    },
    {
      name: 'description',
      label: 'Description (Ideally 100 to 200 characters)',
      type: 'textarea',
      required: true,
      minLength: 70,
      maxLength: 200
    },
    {
      name: 'image',
      label: 'Image (Automatically cropped to 1200 x 630 pixels)',
      type: 'upload',
      relationTo: 'seo-media',
      required: true
    }
  ]
}

const TwitterField: GroupField = {
  interfaceName: 'TwitterField',
  name: 'twitter',
  label: 'Twitter Fields',
  type: 'group',
  fields: [
    {
      name: 'creator',
      label: 'Twitter / X Username (e.g. @username) (Optional)',
      type: 'text',
      minLength: 1,
      maxLength: 200
    },
    {
      name: 'creatorId',
      label: 'Twitter / X ID (Optional)',
      type: 'text',
      minLength: 5,
      maxLength: 200
    }
  ]
}

export const SEO: CollectionConfig = {
  slug: 'seo',
  admin: {
    useAsTitle: 'page'
  },
  versions: {
    drafts: true
  },
  labels: {
    singular: 'SEO Configuration',
    plural: 'SEO Configurations'
  },
  hooks: {
    afterChange: [revalidateCache('seo')]
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      admin: {
        position: 'sidebar'
      },
      name: 'page',
      label: 'Page',
      type: 'select',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'All Rooms', value: 'rooms' },
        { label: 'Double Room', value: 'double-room' },
        { label: 'Twin Room', value: 'twin-room' },
        { label: 'Single Room', value: 'single-room' },
        { label: 'Family Room', value: 'family-room' },
        { label: 'About', value: 'about' },
        { label: 'Contact Us', value: 'contact-us' }
      ],
      unique: true,
      required: true
    },
    MetadataField,
    OpenGraphField,
    TwitterField
  ]
}
