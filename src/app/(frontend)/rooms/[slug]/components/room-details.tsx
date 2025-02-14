import { Bed, ExternalLink, Users } from 'lucide-react'
import Link from 'next/link'

import Image from '@/app/(frontend)/components/image'
import { Room } from '@/payload/payload-types'

import { getBookingPlatform, getRoomAmenities } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

interface Props {
  room: Room
}

export default async function RoomDetails({ room }: Props) {
  const {
    description,
    details: { sleeps_adults, sleeps_children, bed_count }
  } = room

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
                    Sleeps {sleeps_adults + sleeps_children}
                  </span>
                </li>
              </ul>
            </div>

            {/* Amenities */}
            <div className='mt-4 md:mt-8'>
              <h3 className='text-lg font-bold text-gray-900 md:text-2xl'>
                Amenities
              </h3>
              <ul className='mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3'>
                {amenties?.amenities.map((amenity) => {
                  if (typeof amenity === 'string') return null
                  const { name, icon } = amenity
                  const { url, alt } = extractImageProps(icon)

                  return (
                    <li
                      key={amenity.id}
                      className='flex items-center space-x-2'
                    >
                      <div className='rounded-xl bg-indigo-300 p-2'>
                        <Image
                          src={url}
                          alt={alt}
                          height={20}
                          width={20}
                          className='size-4 min-w-4 md:size-6'
                        />
                      </div>

                      <h4 className='text-sm font-medium text-gray-900 md:text-base'>
                        {name}
                      </h4>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <h3 className='sr-only'>Booking and Contact Details</h3>
            <ul className='sticky top-8 rounded-lg bg-white p-6 shadow-lg'>
              {/* <li className='text-center'>
              <p className='text-4xl font-bold text-gray-900'>
                {room.basePrice}
              </p>
              <p className='text-gray-500'>per night</p>
            </li> */}

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

              <li className='mt-8 text-sm text-gray-500'>
                <p className='mb-2'>• Prices are per room per night</p>
                <p className='mb-2'>• Additional guest charges may apply</p>
                {/* <p className='mb-2'>
                • Free cancellation up to 48 hours before check-in
              </p>
              <p>• Check-in: 2:00 PM, Check-out: 10:00 AM</p> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
