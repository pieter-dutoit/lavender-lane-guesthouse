import { CollectionBeforeChangeHook } from 'payload'

const createSlug: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    slug: data.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }
}

export default createSlug
