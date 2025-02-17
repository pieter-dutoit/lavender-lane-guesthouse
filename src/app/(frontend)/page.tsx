import { extractImageProps, getBaseUrl } from '@/lib/utils'
import {
  getFeaturesAndAmenities,
  getHeroData,
  getLogo,
  getSocials,
  getRooms
} from '@/lib/data'

import ContactUs from './components/contact-us'
import Facilities from './components/facilities'
import Hero from './components/hero'
import Reviews from './components/reviews'
import Rooms from './components/rooms'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractNames(groups: any) {
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

function getImagePath(cmsPath: string): string {
  const filename = cmsPath.split('/').pop()
  return `${getBaseUrl()}/api/images/${filename}`
}

export default async function Page() {
  // Hero Image
  const heroData = await getHeroData()
  const { background_image } = heroData
  const heroImageUrl = extractImageProps(background_image).url

  // Logo
  const logo = await getLogo()
  const logoUrl = extractImageProps(logo.logo).url

  // Facilities
  const { amenity_groups, facility_groups } = await getFeaturesAndAmenities()
  const amenities = [
    ...extractNames(amenity_groups),
    ...extractNames(facility_groups)
  ]

  // Rooms
  const rooms = await getRooms()
  // const roomCount = rooms.reduce((current, { count }) => current + count, 0)

  // Socials
  const socials = await getSocials()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'Lavender Lane Guesthouse',
    slogan: 'Your home away from home',
    logo: getImagePath(logoUrl),
    url: getBaseUrl(),
    image: getImagePath(heroImageUrl),
    description:
      'Experience Comfort and Warm Hospitality in Our Centrally Located Bed & Breakfast.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17 Nieshout Street',
      addressLocality: 'Kathu',
      addressRegion: 'Northern Cape',
      postalCode: '8446',
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.69515640283518,
      longitude: 23.052512766502804
    },
    hasMap: 'https://maps.app.goo.gl/SYXQQj1XBv1WPPTb7',
    telephone: '+27673558676',
    email: 'info@lavenderlanekathu.co.za',
    checkinTime: '08:00',
    checkoutTime: '10:00',
    openingHours: 'Mo-Su 08:00-17:00',
    petsAllowed: 'No',
    currenciesAccepted: 'ZAR',
    availableLanguage: [
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
    ],
    numberOfRooms: 15,
    priceRange: '$$',
    starRating: {
      '@type': 'Rating',
      ratingValue: '3',
      bestRating: '5',
      worstRating: '1',
      author: {
        '@type': 'Organization',
        name: 'Tourism Grading Council of South Africa',
        url: 'https://www.tourismgrading.co.za/'
      }
    },
    amenityFeature: amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true
    })),
    containsPlace: rooms.map(
      ({
        gallery,
        name,
        description,
        details: { bed_count, sleeps_adults, sleeps_children }
      }) => ({
        '@type': ['HotelRoom'], // Todo: Add product and price ['HotelRoom', 'Product']
        image: getImagePath(extractImageProps(gallery[0]).url),
        name,
        description,
        bed: bed_count.map(({ bed, quantity }) => {
          if (typeof bed === 'string') return
          const { name } = bed

          return {
            '@type': 'BedDetails',
            typeOfBed: name,
            numberOfBeds: quantity
          }
        }),
        occupancy: {
          '@type': 'QuantitativeValue',
          value: sleeps_adults + sleeps_children,
          unitCode: 'C62'
        }
        // offers: {
        //   '@type': 'Offer',
        //   url: getBaseUrl() + '/' + slug,
        //   availability: 'https://schema.org/InStock'
        // }
      })
    ),
    audience: [
      {
        '@type': 'TouristAudience',
        audienceType: 'Leisure Travelers',
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
    ],
    sameAs: socials.map(({ link }) => link)
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Facilities />
      <Rooms />
      <Reviews />
      <ContactUs />
    </>
  )
}
