import { GroupField } from 'payload'

const Facilities: GroupField = {
  name: 'facilities',
  type: 'group',
  label: 'General Facilities & Amenities',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      minLength: 3,
      maxLength: 100,
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      minLength: 3,
      maxLength: 1000
    },
    {
      name: 'facility_groups',
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
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'facilities',
          type: 'relationship',
          relationTo: 'facilities',
          hasMany: true,
          minRows: 1
        }
      ]
    },
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
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true
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

export default Facilities
