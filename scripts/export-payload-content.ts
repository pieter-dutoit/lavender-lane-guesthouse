import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type AnyRecord = Record<string, any>

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.join(rootDir, 'src/content/site-data.ts')

const VERSIONED_COLLECTIONS = new Set([
  'contact-persons',
  'reviews',
  'rooms',
  'seo',
  'social-media-platforms'
])

const COLLECTIONS = [
  'amenities',
  'beds',
  'contact-persons',
  'media',
  'reviews',
  'rooms',
  'seo',
  'seo-media',
  'social-media-platforms'
]

const GLOBALS = [
  'booking-platform',
  'gallery',
  'general-amenities',
  'hero',
  'logos',
  'pricing',
  'room-amenities'
]

function isObject(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => clean(item))
      .filter((item) => item !== undefined) as T
  }

  if (!isObject(value)) {
    return value
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, entry]) => [key, clean(entry)] as const)
      .filter(([, entry]) => entry !== undefined && entry !== null)
  ) as T
}

function loadEnvValue(value: string): string {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

async function loadEnvFile(filename: string) {
  const envPath = path.join(rootDir, filename)
  const envFile = await fs.readFile(envPath, 'utf8').catch(() => '')

  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const normalized = trimmed.startsWith('export ')
      ? trimmed.slice('export '.length)
      : trimmed
    const separator = normalized.indexOf('=')

    if (separator === -1) continue

    const key = normalized.slice(0, separator).trim()
    const value = loadEnvValue(normalized.slice(separator + 1))

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

function image(media: unknown) {
  if (!isObject(media)) return undefined

  const sourceUrl = typeof media.url === 'string' ? media.url : undefined
  const filename =
    typeof media.filename === 'string'
      ? media.filename
      : sourceUrl
        ? sourceUrl.split('/').pop()
        : undefined
  const storagePrefix = sourceUrl?.includes('/seo-media/')
    ? 'media/seo'
    : 'media'
  const storagePath = filename ? `${storagePrefix}/${filename}` : undefined
  const bucketBaseUrl = process.env.S3_BUCKET_PATH?.replace(/\/$/, '')

  return clean({
    id: media.id,
    filename,
    path: storagePath,
    url:
      bucketBaseUrl && storagePath
        ? `${bucketBaseUrl}/${storagePath}`
        : sourceUrl,
    alt: media.alt,
    width: media.width,
    height: media.height,
    mimeType: media.mimeType,
    filesize: media.filesize
  })
}

function price(priceData: unknown) {
  if (!isObject(priceData)) return undefined

  return clean({
    unitPrice: priceData.unit_price,
    unitType: priceData.unit_type,
    onRequest: priceData.on_request
  })
}

function amenity(amenityData: unknown) {
  if (!isObject(amenityData)) return undefined

  return clean({
    slug: amenityData.slug,
    featured: amenityData.featured,
    name: amenityData.name,
    googleName: amenityData.googleName,
    description: amenityData.description,
    icon: image(amenityData.icon),
    image: image(amenityData.image),
    price: price(amenityData.price)
  })
}

function bed(bedData: unknown) {
  if (!isObject(bedData)) return undefined

  return clean({
    name: bedData.name,
    icon: image(bedData.icon)
  })
}

function room(roomData: unknown) {
  if (!isObject(roomData)) return undefined

  return clean({
    count: roomData.count,
    basePrice: roomData.base_price,
    name: roomData.name,
    slug: roomData.slug,
    description: roomData.description,
    details: {
      sleepsAdults: roomData.details?.sleeps_adults,
      sleepsChildren: roomData.details?.sleeps_children,
      bedCount: Array.isArray(roomData.details?.bed_count)
        ? roomData.details.bed_count.map((item: AnyRecord) =>
            clean({
              bed: bed(item.bed),
              quantity: item.quantity
            })
          )
        : []
    },
    gallery: Array.isArray(roomData.gallery) ? roomData.gallery.map(image) : []
  })
}

function contact(contactData: unknown) {
  if (!isObject(contactData)) return undefined

  return clean({
    name: contactData.name,
    email: contactData.email,
    phone: contactData.phone,
    position: contactData.position
  })
}

function review(reviewData: unknown) {
  if (!isObject(reviewData)) return undefined

  return clean({
    name: reviewData.name,
    title: reviewData.title,
    text: reviewData.text,
    rating: reviewData.rating,
    platform: reviewData.platform,
    link: reviewData.link
  })
}

function seo(seoData: unknown) {
  if (!isObject(seoData)) return undefined

  return clean({
    page: seoData.page,
    meta: {
      title: seoData.meta?.title,
      description: seoData.meta?.description
    },
    openGraph: {
      siteName: seoData.open_graph?.site_name,
      title: seoData.open_graph?.title,
      description: seoData.open_graph?.description,
      image: image(seoData.open_graph?.image)
    },
    twitter: {
      creator: seoData.twitter?.creator,
      creatorId: seoData.twitter?.creatorId
    }
  })
}

function social(socialData: unknown) {
  if (!isObject(socialData)) return undefined

  return clean({
    name: socialData.name,
    icon: image(socialData.icon),
    link: socialData.link
  })
}

function toTypeScript(data: unknown) {
  return `// Generated by scripts/export-payload-content.ts.
// This file is the local content snapshot used for the no-CMS migration.
// It is safe to edit after Payload has been removed.

export type ContentImage = {
  id?: string
  filename?: string
  path?: string
  url?: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
  filesize?: number
}

export type SiteData = typeof siteData

export const siteData = ${JSON.stringify(data, null, 2)} as const
`
}

async function main() {
  await loadEnvFile('.env.local')

  const [{ getPayload }, configModule] = await Promise.all([
    import('payload'),
    import('../src/payload/payload.config')
  ])

  const payload = await getPayload({ config: configModule.default })

  const collections = Object.fromEntries(
    await Promise.all(
      COLLECTIONS.map(async (collection) => {
        const result = await payload.find({
          collection: collection as never,
          depth: 8,
          draft: false,
          pagination: false,
          ...(VERSIONED_COLLECTIONS.has(collection) && {
            where: {
              _status: {
                equals: 'published'
              }
            }
          })
        })

        return [collection, result.docs]
      })
    )
  )

  const globals = Object.fromEntries(
    await Promise.all(
      GLOBALS.map(async (slug) => {
        const result = await payload.findGlobal({
          slug: slug as never,
          depth: 8,
          draft: false
        })

        return [slug, result]
      })
    )
  )

  const siteData = clean({
    exportedAt: new Date().toISOString(),
    bookingPlatform: {
      name: globals['booking-platform']?.name,
      url: globals['booking-platform']?.url
    },
    pricing: {
      additionalGuest: globals.pricing?.additional_guest
    },
    logo: image(globals.logos?.logo),
    hero: {
      backgroundImage: image(globals.hero?.background_image)
    },
    contacts: collections['contact-persons'].map(contact),
    socials: collections['social-media-platforms'].map(social),
    rooms: collections.rooms.map(room),
    beds: collections.beds.map(bed),
    amenities: collections.amenities.map(amenity),
    roomAmenities: Array.isArray(globals['room-amenities']?.amenities)
      ? globals['room-amenities'].amenities.map(amenity)
      : [],
    generalAmenities: Array.isArray(
      globals['general-amenities']?.amenity_groups
    )
      ? globals['general-amenities'].amenity_groups.map((group: AnyRecord) =>
          clean({
            heading: group.heading,
            amenities: Array.isArray(group.amenities)
              ? group.amenities.map(amenity)
              : []
          })
        )
      : [],
    gallery: Array.isArray(globals.gallery?.images)
      ? globals.gallery.images.map(image)
      : [],
    reviews: collections.reviews.map(review),
    seo: Object.fromEntries(
      collections.seo
        .map((item: unknown) => seo(item))
        .filter((entry: unknown): entry is AnyRecord => isObject(entry))
        .map((entry: AnyRecord) => [entry.page, entry])
    ),
    media: {
      images: collections.media.map(image),
      seoImages: collections['seo-media'].map(image)
    }
  })

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, toTypeScript(siteData))

  console.log(`Exported local content to ${path.relative(rootDir, outputPath)}`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
