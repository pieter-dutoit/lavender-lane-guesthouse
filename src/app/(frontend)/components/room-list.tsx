import Link from 'next/link'
import { ExternalLink, Users } from 'lucide-react'

import { getBookingPlatform, getRooms } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

import Image from './image'

export default async function RoomList() {
  const rooms = await getRooms()
  const bookingPlatform = await getBookingPlatform()
  return (
    <ul className='mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4'>
      {rooms.map(({ id, name, description, gallery, details, slug }) => {
        const { sleeps_adults, sleeps_children } = details
        const { url, alt } = extractImageProps(gallery[0])

        return (
          <li
            key={id}
            className='flex-col overflow-hidden rounded-xl bg-white shadow-lg'
          >
            {/* Images */}
            <div className='relative h-52 overflow-hidden rounded-lg bg-gray-200'>
              <Image
                className='object-cover object-center'
                src={url}
                alt={alt}
                fill
                sizes='(max-width: 640px) 90vw 20rem'
              />
            </div>

            {/* Details */}
            <div className='flex flex-1 flex-col justify-between p-6'>
              <div className='flex flex-1 flex-col'>
                <h3 className='text-xl font-semibold text-gray-900'>{name}</h3>
                <div className='mt-3 mr-auto flex items-center gap-2 bg-transparent text-sm font-bold text-indigo-600'>
                  <Users size={14} />
                  Sleeps {sleeps_adults + sleeps_children}
                </div>
                <p className='mt-3 line-clamp-2 text-base text-gray-500'>
                  {description}
                </p>
              </div>

              {/* <p className='mt-6 text-lg font-extrabold md:text-xl'>
                  from R{base_price} / night
                </p> */}

              <div className='mt-4 flex flex-wrap items-start justify-between gap-2'>
                <Link
                  href={`/rooms/${slug}`}
                  className='rounded py-2 font-semibold text-indigo-600 underline-offset-2 hover:underline'
                >
                  View Details
                </Link>
                <Link
                  href={bookingPlatform.url}
                  target='_blank'
                  className='inline-flex items-center gap-2 rounded bg-indigo-600 px-3 py-2 font-semibold text-white hover:bg-indigo-700'
                >
                  Book Now <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
