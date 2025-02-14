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
    <section
      className='bg-gradient-to-b from-gray-50 to-gray-200 py-12 lg:py-20'
      id='amenities'
    >
      <div className='container mx-auto grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-3 lg:px-8'>
        {/* Main Content */}
        <div className='lg:col-span-2'>
          <h2 className='text-3xl font-bold text-gray-900'>Room Overview</h2>
          <p className='mt-4 text-lg text-gray-600'>{description}</p>

          {/* Image Gallery */}
          <div className='mt-8 grid grid-cols-2 gap-4'>
            {room.gallery.map((image) => {
              if (typeof image === 'string') return null
              const { url, alt } = extractImageProps(image)
              return (
                <div key={image.id} className='relative aspect-[4/3]'>
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    className='rounded-lg object-cover'
                  />
                </div>
              )
            })}
          </div>

          {/* Room Features */}
          <div className='mt-12'>
            <h3 className='text-2xl font-bold text-gray-900'>Room Features</h3>
            <ul className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              {bed_count.map(({ bed, quantity }) => {
                if (typeof bed === 'string') return null
                return (
                  <li key={bed.id} className='flex items-center space-x-3'>
                    <Bed className='h-6 w-6 text-indigo-600' />
                    <span className='text-gray-700'>
                      {quantity} x {bed.name} Bed{quantity === 1 ? '' : 's'}
                    </span>
                  </li>
                )
              })}

              <li className='flex items-center space-x-3'>
                <Users className='h-6 w-6 text-indigo-600' />
                <span className='text-gray-700'>
                  Sleeps {sleeps_adults + sleeps_children}
                </span>
              </li>
            </ul>
          </div>

          {/* Amenities */}
          <div className='mt-12'>
            <h3 className='text-2xl font-bold text-gray-900'>Amenities</h3>
            <ul className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              {amenties?.amenities.map((amenity) => {
                if (typeof amenity === 'string') return null
                const { name, icon } = amenity
                const { url, alt } = extractImageProps(icon)

                return (
                  <li key={amenity.id} className='flex items-center space-x-3'>
                    <div className='rounded-xl bg-indigo-300 p-2'>
                      <Image
                        src={url}
                        alt={alt}
                        height={20}
                        width={20}
                        className='size-6'
                      />
                    </div>

                    <h4 className='text-lg font-medium text-gray-900'>
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
    </section>
  )
}
