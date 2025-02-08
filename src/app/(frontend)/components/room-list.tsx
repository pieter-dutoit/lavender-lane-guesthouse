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
      {rooms.map(({ id, name, description, gallery, details }) => {
        const { sleeps_adults, sleeps_children } = details
        return (
          <li
            key={id}
            className='flex-col overflow-hidden rounded-xl bg-white shadow-lg'
          >
            <div>
              {/* <Link href={`/rooms/${slug}`}> */}
              {/* Images */}
              <div className='grid grid-cols-2 gap-2 p-2'>
                {gallery.slice(0, 1).map((image, index) => {
                  const { url, alt } = extractImageProps(image)

                  return (
                    <div
                      key={url + index}
                      className={`${index ? 'col-span-1' : 'col-span-2'} relative h-40 overflow-hidden rounded-lg bg-gray-200`}
                    >
                      <Image
                        className='object-cover object-center'
                        src={url}
                        alt={alt}
                        fill
                      />
                    </div>
                  )
                })}
              </div>

              {/* Details */}
              <div className='flex flex-1 flex-col justify-between p-6'>
                <div className='flex flex-1 flex-col'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {name}
                  </h3>
                  <div className='mt-3 mr-auto flex items-center gap-2 bg-transparent text-sm font-bold text-indigo-600'>
                    <Users size={14} />
                    Sleeps {sleeps_adults + sleeps_children}
                  </div>
                  <p className='mt-3 line-clamp-2 text-base text-gray-500'>
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
              {/* </Link> */}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
