/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSourceSet } from '@/app/(frontend)/components/image'
import { Media, Room } from '@/payload/payload-types'

import { extractContactDetails, extractImageProps, getBaseUrl } from '.'

import {
  // getAddOns,
  getBookingPlatform,
  getContacts,
  getHeroData,
  getLogo,
  // getPrices,
  getRoom,
  getRoomAmenities,
  getRooms,
  getSocials
} from '../data'
import { BUSINESS_HOURS } from '../constants'

const BUSINESS_AUDIENCE = [
  {
    '@type': 'TouristAudience',
    audienceType: 'Leisure Travelers',
    geographicArea: { '@type': 'Country', name: 'South Africa' }
  },
  {
    '@type': 'BusinessAudience',
    audienceType: 'Corporate Travelers',
    numberOfEmployees: 1
  },
  { '@type': 'Audience', audienceType: 'Contractors' },
  { '@type': 'Audience', audienceType: 'Families' },
  { '@type': 'Audience', audienceType: 'Event Attendees' },
  { '@type': 'Audience', audienceType: 'Extended Stays' },
  { '@type': 'Audience', audienceType: 'Solo Travelers' }
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

const OPERATING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: BUSINESS_HOURS.opens,
    closes: BUSINESS_HOURS.closes
  }
]

export function extractFacilityNames(groups: any) {
  if (!Array.isArray(groups)) return []

  return groups.flatMap((group) =>
    Array.isArray(group?.amenities ?? group?.facilities)
      ? (group.amenities ?? group.facilities)
          .filter((item: any) => item?.googleName)
          .map((item: any) =>
            typeof item === 'string' ? item : item?.googleName
          )
      : []
  )
}

export function createAbsoluteImagePath(cmsPath: string): string {
  const filename = cmsPath.split('/').pop()
  return `${getBaseUrl()}/api/images/${filename}`
}

export function createAmenitiesList(
  amenities: string[],
  includeDefault: boolean = false
) {
  return [
    ...(includeDefault
      ? [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'InstantBookable',
            value: true
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'InternetType',
            value: 'FREE'
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'ParkingType',
            value: 'FREE'
          }
        ]
      : []),
    ...amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true
    }))
  ]
}

export function createMediaObject(image: Media | string) {
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
    creditText: 'The Grand Collection',
    creator: {
      '@type': 'Organization',
      '@id': getBaseUrl() + '/#organization',
      name: 'The Grand Collection'
    },
    copyrightNotice: `© ${currentYear} The Grand Collection. All Rights Reserved.`,
    license: getBaseUrl(),
    acquireLicensePage: getBaseUrl()
  }
}

export function createBreadCrumbs(
  crumbs: { name: string; item?: string }[] = []
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getBaseUrl()
      },
      ...crumbs.map(({ name, item }, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name,
        item: getBaseUrl() + item
      }))
    ]
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
    '@id': getBaseUrl() + '/#BedAndBreakfast',
    identifier: 'lavender-lane-guesthouse-kathu',
    url: getBaseUrl(),
    name: 'Lavender Lane Guesthouse',
    description:
      'Enjoy a relaxing stay at one of 15 comfortable rooms with DSTV, air-conditioning, and free Wi-Fi.',
    slogan: 'Your home away from home',
    logo: createAbsoluteImagePath(logoUrl),
    image: createAbsoluteImagePath(heroImageUrl),
    address: ADDRESS,
    geo: COORDINATES,
    hasMap: 'https://maps.app.goo.gl/SYXQQj1XBv1WPPTb7',
    telephone: `+27${contacts[0].phoneLink}`,
    email: contacts[0].email,
    checkinTime: BUSINESS_HOURS.checkin,
    checkoutTime: BUSINESS_HOURS.checkout,
    openingHoursSpecification: OPERATING_HOURS,
    currenciesAccepted: 'ZAR',
    availableLanguage: LANGUAGES,
    starRating: STAR_RATING,
    audience: BUSINESS_AUDIENCE,
    sameAs: socials.map(({ link }) => link),
    priceRange: '$'
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
  // const { additional_guest } = await getPrices()
  const roomAmenities = await getRoomAmenities()
  // const addOns = await getAddOns()
  const bookingPlatform = await getBookingPlatform()

  const amenityFeature = withAmenities
    ? createAmenitiesList(
        roomAmenities.amenities
          .filter((room) => typeof room !== 'string')
          .map(({ googleName }) => googleName)
          .filter((name) => typeof name === 'string')
      )
    : []

  const BED_TYPE_MAP: { [key: string]: string } = {
    'Three-Quarter': 'Single'
  }

  const {
    slug,
    name,
    description,
    // base_price,
    gallery,
    details: { bed_count, sleeps_adults, sleeps_children }
  } = room

  const sleepsCount = sleeps_adults + sleeps_children
  // const maxPrice = base_price + additional_guest * (sleepsCount - 1)

  return {
    '@type': ['HotelRoom', 'Product'],
    '@id': getBaseUrl() + '/rooms/' + slug,
    url: getBaseUrl() + '/rooms/' + slug,
    identifier: slug,
    name,
    description,
    image: gallery.map((media) => createMediaObject(media)),
    offers: {
      '@type': ['Offer', 'LodgingReservation'],
      identifier: slug + '-standard-rate',
      url: bookingPlatform.url,
      checkinTime: BUSINESS_HOURS.checkin,
      checkoutTime: BUSINESS_HOURS.checkout,
      availability: 'https://schema.org/InStock'
      // priceSpecification: {
      //   '@type': 'CompoundPriceSpecification',
      //   price: base_price,
      //   ...(base_price !== maxPrice && {
      //     minPrice: base_price,
      //     maxPrice
      //   }),
      //   priceCurrency: 'ZAR'
      // },
      // ...(addOns && {
      //   addOn: addOns.map(({ name, slug, price }) => ({
      //     '@type': 'Offer',
      //     name,
      //     identifier: slug + '-add-on',
      //     priceSpecification: {
      //       '@type': 'UnitPriceSpecification',
      //       price: price?.unit_price,
      //       priceCurrency: 'ZAR',
      //       unitText: price?.unit_type
      //     }
      //   }))
      // })
    },
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
      value: sleepsCount
    },
    ...(withAmenities && { amenityFeature })
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

export async function getNumberOfRoomsStructuredData() {
  const rooms = await getRooms()
  return rooms.map((room) => ({
    '@type': 'QuantitativeValue',
    value: room.count,
    unitText: room.name
  }))
}
