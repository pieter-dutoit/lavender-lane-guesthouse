import Link from 'next/link'
import { Bed, ExternalLink, ShowerHead, Users } from 'lucide-react'

import { extractImageProps } from '@/lib/utils'
import { getBookingPlatform, getRooms } from '@/lib/data'

import SectionHeader from '../../components/section-header'
import Image from '../../components/image'

export default async function Rooms() {
  const bookingPlatform = await getBookingPlatform()
  const rooms = await getRooms()

  return (
    <section
      className='bg-gradient-to-b from-gray-100 to-gray-200 py-12 lg:py-20'
      id='rooms'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader label='Choose Your Space' heading='Our Rooms' />

        {/* CTAs */}
        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-16'>
          <Link
            href={bookingPlatform.url}
            className='flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700'
            target='_blank'
          >
            Check Availability <ExternalLink size={16} />
          </Link>
          {/* <Link
            href='#pricing'
            className='flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-indigo-600 underline-offset-2 hover:underline'
          >
            View Prices
          </Link> */}
        </div>

        {/* Rooms */}
        <ul className='mx-auto mt-12 grid max-w-6xl gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-16'>
          {rooms.map(({ id, name, description, gallery, details }) => {
            const { sleeps_adults, sleeps_children, bed_count } = details
            const { url, alt } = extractImageProps(gallery[0])

            return (
              <li
                key={id}
                className='flex-col overflow-hidden rounded-xl bg-white shadow-lg'
              >
                <div>
                  {/* Images */}
                  <div className='grid p-2'>
                    <div className='relative aspect-4/3 overflow-hidden rounded-lg bg-gray-200'>
                      <Image
                        className='object-cover object-center'
                        src={url}
                        alt={alt}
                        fill
                        sizes='(max-width: 640px) 90vw 20rem'
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className='flex flex-1 flex-col justify-between p-6'>
                    <div className='flex flex-1 flex-col gap-2'>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {name}
                      </h3>

                      <ul className='mt-3 flex flex-col flex-wrap gap-1 font-bold text-indigo-600'>
                        {/* Sleeps */}
                        <li className='flex items-center gap-2'>
                          <h4 className='sr-only'>Sleeps up to:</h4>
                          <Users size={16} />
                          Sleeps {sleeps_adults + sleeps_children}
                        </li>
                        {/* Beds */}
                        <li className='flex flex-wrap items-center gap-8'>
                          {bed_count.map(({ bed, quantity, id }) => {
                            if (typeof bed === 'string') return null

                            return (
                              <div key={id} className='flex items-center gap-2'>
                                <Bed size={16} />
                                <span>
                                  {quantity} x {bed.name} Bed
                                  {quantity === 1 ? '' : 's'}
                                </span>
                              </div>
                            )
                          })}
                        </li>
                        {/* Bathroom */}
                        <li key={id} className='flex items-center gap-2'>
                          <ShowerHead size={16} />
                          <span>En-suite Shower, Toilet</span>
                        </li>
                      </ul>

                      {/* Overivew */}
                      <p className='mt-3 text-base text-gray-500'>
                        {description}
                      </p>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <Link
                        href={bookingPlatform.url}
                        target='_blank'
                        className='inline-flex items-center gap-2 rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
                      >
                        Book Now <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
