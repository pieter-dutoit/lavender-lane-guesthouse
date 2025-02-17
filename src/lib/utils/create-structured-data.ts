import { createSourceSet } from '@/app/(frontend)/components/image'
import { Media, Room } from '@/payload/payload-types'

import { extractContactDetails, extractImageProps, getBaseUrl } from '.'
import {
  getContacts,
  getHeroData,
  getLogo,
  getRoom,
  getRoomAmenities,
  getRooms,
  getSocials
} from '../data'

const BUSINESS_AUDIENCE = [
  {
    '@type': 'TouristAudience',
    audienceType: 'Leisure Travellers',
    geographicArea: {
      '@type': 'Country',
      name: 'South Africa'
    }
  },
  {
    '@type': 'BusinessAudience',
    audienceType: 'Corporate Travelers & Business Guests',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 1
    }
  },
  {
    '@type': 'Audience',
    audienceType: 'Contractors & Field Workers'
  },
  {
    '@type': 'Audience',
    audienceType: 'Small Families'
  },
  {
    '@type': 'Audience',
    audienceType: 'Wedding Guests & Event Attendees'
  },
  {
    '@type': 'Audience',
    audienceType: 'Extended Stays & Relocations'
  },
  {
    '@type': 'Audience',
    audienceType: 'Solo Travelers'
  }
]

const STAR_RATING = {
  '@type': 'Rating',
  ratingValue: '3',
  bestRating: '5',
  worstRating: '1',
  author: {
    '@type': 'Organization',
    name: 'Tourism Grading Council of South Africa',
    url: 'https://www.tourismgrading.co.za/'
  }
}

const LANGUAGES = [
  {
    '@type': 'Language',
    name: 'English',
    alternateName: 'en'
  },
  {
    '@type': 'Language',
    name: 'Afrikaans',
    alternateName: 'af'
  }
]

const COORDINATES = {
  '@type': 'GeoCoordinates',
  latitude: -27.69515640283518,
  longitude: 23.052512766502804
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '17 Nieshout Street',
  addressLocality: 'Kathu',
  addressRegion: 'Northern Cape',
  postalCode: '8446',
  addressCountry: 'ZA'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractFacilityNames(groups: any) {
  if (!Array.isArray(groups)) return []

  return groups.flatMap((group) =>
    Array.isArray(group?.amenities ?? group?.facilities)
      ? (group.amenities ?? group.facilities)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => (typeof item === 'string' ? item : item?.name))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((name: any) => typeof name === 'string') // Ensure only valid names are included
      : []
  )
}

export function createAbsoluteImagePath(cmsPath: string): string {
  const filename = cmsPath.split('/').pop()
  return `${getBaseUrl()}/api/images/${filename}`
}

export function createAmenitiesList(amenities: string[]) {
  return amenities.map((name) => ({
    '@type': 'LocationFeatureSpecification',
    name,
    value: true
  }))
}

export function createMediaObject(image: Media) {
  const { url, alt } = extractImageProps(image)
  const contentUrl = createAbsoluteImagePath(url)
  const thumbnailUrl = createSourceSet(contentUrl, false)
    .split(',')[0]
    .split(' ')[0]
  const currentYear = new Date().getFullYear()
  return {
    '@type': 'ImageObject',
    contentUrl,
    thumbnailUrl,
    caption: alt,
    creditText: 'Lavender Lane Guesthouse',
    creator: {
      '@type': 'Organization',
      name: 'Lavender Lane Guesthouse'
    },
    copyrightNotice: `© ${currentYear} Lavender Lane Guesthouse. All Rights Reserved.`,
    license: 'https://lavenderlanekathu.co.za/contact',
    acquireLicensePage: getBaseUrl() + '/contact'
  }
}

export async function getBusinessStructuredData() {
  // Logo
  const logoData = await getLogo()
  const logoUrl = extractImageProps(logoData.logo).url

  // Hero Image
  const heroData = await getHeroData()
  const heroImageUrl = extractImageProps(heroData.background_image).url

  // Socials
  const socials = await getSocials()

  // Contact data
  const contactsData = await getContacts()
  const contacts = extractContactDetails(contactsData)

  return {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'Lavender Lane Guesthouse',
    slogan: 'Your home away from home',
    logo: createAbsoluteImagePath(logoUrl),
    image: createAbsoluteImagePath(heroImageUrl),
    address: ADDRESS,
    geo: COORDINATES,
    hasMap: 'https://maps.app.goo.gl/SYXQQj1XBv1WPPTb7',
    telephone: `+27${contacts[0].phoneLink}`,
    email: contacts[0].email,
    checkinTime: '08:00',
    checkoutTime: '10:00',
    openingHours: 'Mo-Su 08:00-17:00',
    petsAllowed: 'No',
    currenciesAccepted: 'ZAR',
    availableLanguage: LANGUAGES,
    starRating: STAR_RATING,
    audience: BUSINESS_AUDIENCE,
    sameAs: socials.map(({ link }) => link),
    priceRange: '$$'
  }
}

async function createRoomStructuredData(
  room: Room,
  {
    withAmenities = false
  }: {
    withAmenities?: boolean
  } = {}
) {
  const roomAmenities = await getRoomAmenities()
  const amenities = roomAmenities.amenities
    .filter((room) => typeof room !== 'string')
    .map(({ name }) => name)
  const amenityFeature = withAmenities ? createAmenitiesList(amenities) : []

  const BED_TYPE_MAP: { [key: string]: string } = {
    'Three-Quarter': 'Single'
  }

  const {
    gallery,
    name,
    description,
    details: { bed_count, sleeps_adults, sleeps_children }
  } = room

  return {
    '@type': ['HotelRoom'], // Todo: Add product and price ['HotelRoom', 'Product']
    image: createAbsoluteImagePath(extractImageProps(gallery[0]).url),
    name,
    description,
    bed: bed_count.map(({ bed, quantity }) => {
      if (typeof bed === 'string') return
      const { name } = bed

      return {
        '@type': 'BedDetails',
        typeOfBed: (BED_TYPE_MAP[name] || name).toUpperCase(),
        numberOfBeds: quantity
      }
    }),
    occupancy: {
      '@type': 'QuantitativeValue',
      value: sleeps_adults + sleeps_children,
      unitCode: 'C62'
    },
    ...(withAmenities && { amenityFeature })
    // offers: {
    //   '@type': 'Offer',
    //   url: getBaseUrl() + '/' + slug,
    //   availability: 'https://schema.org/InStock'
    // }
  }
}

export async function getRoomsStructuredData({
  withAmenities = false
}: { withAmenities?: boolean } = {}) {
  const rooms = await getRooms()
  const roomDataPromises = rooms.map((room) =>
    createRoomStructuredData(room, { withAmenities })
  )
  return Promise.all(roomDataPromises)
}

export async function getRoomStructuredData(roomSlug: string) {
  const room = await getRoom(roomSlug)
  if (typeof room === 'string') return {}
  const roomData = await createRoomStructuredData(room, {
    withAmenities: true
  })
  return roomData
}
