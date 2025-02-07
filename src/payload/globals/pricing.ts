import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import revalidateCache from '../hooks/globals/revalidate-cache'

export const Pricing: GlobalConfig = {
  slug: 'pricing',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('pricing')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'base_price',
      label: 'Base Room Price',
      type: 'number',
      min: 0,
      max: 10000,
      defaultValue: 1000
    },
    {
      name: 'additional_guest',
      label: 'Additional Guest Price',
      type: 'number',
      min: 0,
      max: 10000,
      defaultValue: 300
    },
    {
      name: 'price_items',
      type: 'array',
      label: 'Price Items',
      fields: [
        {
          name: 'item_name',
          type: 'text',
          label: 'Item Name',
          required: true
        },
        {
          name: 'item_price',
          type: 'number',
          label: 'Item Price',
          required: true
        },
        {
          name: 'unit_type',
          type: 'text',
          label: 'Unit Type',
          required: false
        }
      ],
      defaultValue: [
        {
          item_name: 'Breakfast Price',
          item_price: 100,
          unit_type: 'per meal'
        },
        {
          item_name: 'Lunch Pack Price',
          item_price: 150,
          unit_type: 'per pack'
        },
        {
          item_name: 'Dinner Voucher Price',
          item_price: 100,
          unit_type: 'per voucher'
        },
        { item_name: 'Laundry Price', item_price: 100, unit_type: 'per load' }
      ]
    }
  ]
}
