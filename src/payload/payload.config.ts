import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { HomePage } from './globals/home-page'
import { Gallery } from './globals/gallery'
import { AboutUsPage } from './globals/about-us-page'

import { Users } from './collections/users'
import { Media } from './collections/media'
import { ContactPersons } from './collections/contact-persons'
import { RichtextSections } from './collections/richtext-section'
import { SEOMedia } from './collections/seo-media'
import { SocialMediaPlatforms } from './collections/social-media-platforms'
import { Amenities } from './collections/amenities'
import { Rooms } from './collections/rooms'
import { Beds } from './collections/beds'
import { Facilities } from './collections/facilities'
import { Reviews } from './collections/reviews'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/cms/admin',
    api: '/cms/api'
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  collections: [
    Users,
    Media,
    SEOMedia,
    ContactPersons,
    SocialMediaPlatforms,
    RichtextSections,
    Amenities,
    Facilities,
    Rooms,
    Reviews,
    Beds
  ],
  globals: [HomePage, AboutUsPage, Gallery],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      dbName: process.env.DATABASE_NAME || 'lavender-lane-dev'
    }
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media'
        },
        'seo-media': {
          prefix: 'media/seo'
        }
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT
      }
    })
  ],
  upload: {
    limits: {
      fileSize: 4500000
    }
  }
})
