import { Bed, ExternalLink, Users } from 'lucide-react'
import Link from 'next/link'

import Image from '@/app/(frontend)/components/image'
import AmenityItem from '@/app/(frontend)/components/amenity-item'
import { Room } from '@/payload/payload-types'

import {
  getBookingPlatform,
  getContacts,
  getPrices,
  getRoomAmenities
} from '@/lib/data'
import { extractContactDetails, extractImageProps } from '@/lib/utils'

interface Props {
  room: Room
}

export default async function RoomDetails({ room }: Props) {
  const contacts = await getContacts()
  const contactDetails = extractContactDetails(contacts)
  const {
    description,
    details: { sleeps_adults, sleeps_children, bed_count }
  } = room
  const sleeps_count = sleeps_adults + sleeps_children

  const prices = await getPrices()
  const amenties = await getRoomAmenities()
  const bookingPlatform = await getBookingPlatform()

  return (
    <section className='bg-gradient-to-b from-gray-200 to-white pb-12 lg:pb-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* Main Content */}
        <div className='mt-6 grid grid-cols-1 gap-12 pt-8 sm:pt-12 lg:mt-12 lg:grid-cols-3 lg:pt-20'>
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-bold text-gray-900 md:text-3xl'>
              Room Overview
            </h2>
            <p className='mt-4 text-gray-600 md:text-lg'>{description}</p>

            {/* Image Gallery */}
            <h3 className='sr-only'>Room Gallery</h3>
            <ul className='mt-8 grid grid-cols-2 gap-4'>
              {room.gallery.slice(0, 4).map((image) => {
                if (typeof image === 'string') return null
                const { url, alt } = extractImageProps(image)
                return (
                  <li
                    key={image.id}
                    className='relative aspect-[4/3] overflow-hidden rounded-lg bg-indigo-200'
                  >
                    <Image
                      src={url}
                      alt={alt}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 40vw, 24rem'
                      priority
                    />
                  </li>
                )
              })}
            </ul>

            {/* Room Features */}
            <div className='mt-4 md:mt-8'>
              <h3 className='text-lg font-bold text-gray-900 md:text-2xl'>
                Features
              </h3>
              <ul className='mt-6 flex flex-wrap items-center gap-2 md:gap-4 lg:gap-6'>
                {bed_count.map(({ bed, quantity }) => {
                  if (typeof bed === 'string') return null
                  return (
                    <li key={bed.id} className='flex items-center space-x-3'>
                      <Bed className='size-4 text-indigo-600 md:size-6' />
                      <span className='text-sm text-gray-700 md:text-base'>
                        {quantity} x {bed.name} Bed{quantity === 1 ? '' : 's'}
                      </span>
                    </li>
                  )
                })}

                <li className='flex items-center space-x-3'>
                  <Users className='size-4 text-indigo-600 md:size-6' />
                  <span className='text-sm text-gray-700 md:text-base'>
                    Sleeps {sleeps_count}
                  </span>
                </li>
              </ul>
            </div>

            {/* Amenities */}
            <div className='mt-4 md:mt-8'>
              <h3 className='text-lg font-bold text-gray-900 md:text-2xl'>
                Amenities
              </h3>
              <ul className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {amenties?.amenities.map((amenity, index) => (
                  <AmenityItem
                    key={'amenity' + index}
                    amenity={amenity}
                    variant='minimal'
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <h3 className='sr-only'>Booking and Contact Details</h3>
            <ul className='sticky top-20 rounded-lg bg-white p-6 shadow-lg'>
              <li className='mb-4 text-left'>
                <p className='flex flex-col text-gray-500'>
                  {sleeps_count > 1 && 'from'}
                  <span className='text-4xl font-bold text-gray-900'>
                    R{room.base_price}
                  </span>
                  per night, for one person
                </p>
              </li>

              {sleeps_count > 1 && (
                <>
                  <li className='mt-2 text-sm font-semibold'>
                    R{prices.additional_guest} per additional guest per night
                  </li>
                  <li className='mt-2 text-sm font-semibold'>
                    Children under 7 stay for free
                  </li>
                </>
              )}

              <li className='mt-8'>
                <Link
                  href={bookingPlatform.url}
                  target='_blank'
                  className='flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 py-3 text-center font-semibold text-white transition-colors duration-300 hover:bg-indigo-700'
                >
                  Check Availability <ExternalLink size={12} />
                </Link>
              </li>

              <li className='mt-6'>
                <Link
                  href='/contact-us'
                  className='block w-full rounded-md border border-indigo-600 bg-white py-3 text-center font-semibold text-indigo-600 transition-colors duration-300 hover:bg-indigo-50'
                >
                  Contact Us
                </Link>
              </li>

              <li className='mt-8 font-bold text-indigo-500'>
                <Link href={`tel:${contactDetails[0].phoneLink}`}>
                  {contactDetails[0].phone}
                </Link>
              </li>

              <li className='mt-2 font-bold text-indigo-500'>
                <Link href={`mailto:${contactDetails[0].email}`}>
                  {contactDetails[0].email}
                </Link>
              </li>

              <li className='mt-8 text-sm text-gray-500'>
                Check-in: 2:00 PM, Check-out: 10:00 AM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
