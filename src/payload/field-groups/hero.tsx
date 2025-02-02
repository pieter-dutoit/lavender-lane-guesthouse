import { GroupField } from 'payload'

const HeroFields: GroupField = {
  name: 'hero',
  label: 'Hero / Banner',
  type: 'group',
  fields: [
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Select the Background Image',
      required: true
    },
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading (H1: Ideally 20 to 70 characters for SEO)',
      required: true
    },
    {
      name: 'subheading',
      type: 'richText',
      label: 'Subtitle',
      required: true
    }
  ]
}

export default HeroFields
