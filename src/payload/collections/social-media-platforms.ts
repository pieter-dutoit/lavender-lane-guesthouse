import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const SocialMediaPlatforms: CollectionConfig = {
  slug: 'social-media-platforms',
  labels: {
    singular: 'Social Media Platform',
    plural: 'Social Media Platforms'
  },
  admin: {
    useAsTitle: 'name'
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('social-media-platforms')]
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Platform Name',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'link',
      label: 'URL / Link to platform',
      type: 'text',
      required: true
    }
  ]
}
