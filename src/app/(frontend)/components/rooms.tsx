import Link from 'next/link'
import SectionHeader from './section-header'
import Image from './image'
import { getRooms } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'
import { ArrowRight, Users } from 'lucide-react'

export default async function Rooms() {
  const rooms = await getRooms()
  if (!rooms) return <></>

  return (
    <section className='bg-gray-100 py-12 lg:py-20' id='rooms'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Stay, Work, Recharge'
          heading='Our Rooms'
          description='Choose from our selection of comfortable rooms, with everything you need to recharge and get ready for the next day.'
        />

        <ul className='mt-12 grid gap-8 md:grid-cols-2'>
          {rooms.map(({ id, name, slug, description, gallery, details }) => {
            const { sleeps_adults, sleeps_children } = details
            return (
              <li
                key={id}
                className='flex flex-col overflow-hidden rounded-lg bg-white shadow-lg'
              >
                {/* Images */}
                <div className='grid grid-cols-3 gap-2 p-2'>
                  {gallery.slice(0, 2).map((image, index) => {
                    const { url, alt } = extractImageProps(image)

                    return (
                      <div
                        key={url + index}
                        className={`${index ? 'col-span-1' : 'col-span-2'} relative h-48 overflow-hidden rounded-lg bg-gray-200`}
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
                    <div className='mt-2 mr-auto flex items-center gap-2 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white'>
                      <Users size={14} />
                      Sleeps {sleeps_adults + sleeps_children}
                    </div>
                    <p className='mt-3 text-base text-gray-500'>
                      {description}
                    </p>
                  </div>
                  <div className='mt-6 flex items-center justify-between'>
                    <Link
                      href='#'
                      className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
                    >
                      Book Now
                    </Link>
                    <Link
                      href={`/rooms/${slug}`}
                      className='under flex items-center gap-2 font-semibold text-indigo-600 underline-offset-2 hover:underline'
                    >
                      View details <ArrowRight />
                    </Link>
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
