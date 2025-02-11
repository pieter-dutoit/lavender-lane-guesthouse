import { ContactPerson, Media, SeoMedia } from '@/payload/payload-types'

export function extractImageProps(
  image: Media | string | SeoMedia | undefined
): {
  url: string
  alt: string
  width: number
  height: number
} {
  if (typeof image === 'string')
    return { url: image, alt: '', width: 0, height: 0 }
  const { url, alt, height, width } =
    typeof image === 'object'
      ? image
      : { url: '', alt: '', height: 0, width: 0 }
  return {
    url: url ?? '',
    alt: alt ?? '',
    height: height ?? 0,
    width: width ?? 0
  }
}

export function extractContactDetails(contacts: ContactPerson[] | undefined): {
  name: string | undefined | null
  phone: string
  phoneLink: string
  email: string
  position: string | undefined | null
}[] {
  if (!contacts) return []

  return contacts.map(({ name, phone, email, position }) => {
    const phoneLink = phone
      .replaceAll(' ', '')
      .replace(/^0/, '')
      .replace(/^\+27/, '')

    return { name, phone, phoneLink, email, position }
  })
}

export function getBaseUrl(): string {
  const env = process.env.VERCEL_ENV || ''

  return (
    {
      production: process.env.VERCEL_PROJECT_PRODUCTION_URL
    }[env] ||
    process.env.VERCEL_URL ||
    process.env.VERCEL_BRANCH_URL ||
    'http://localhost:3000'
  )
}
