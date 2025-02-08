import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import RoomList from '../../components/room-list'
import SectionHeader from '../../components/section-header'
import { getBookingPlatform } from '@/lib/data'

export default async function Rooms() {
  const bookingPlatform = await getBookingPlatform()
  return (
    <section
      className='bg-gradient-to-b from-gray-100 to-gray-200 py-12 lg:py-20'
      id='rooms'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader label='Choose Your Space' heading='Our Rooms' />
        <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
          <div className='mx-auto flex flex-col items-center gap-2 sm:gap-4'>
            <Link
              href={bookingPlatform.url}
              className='flex items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-8 md:py-3 md:text-lg'
              target='_blank'
            >
              Check Availability <ExternalLink size={16} />
            </Link>
            {/* <Link
              href='#pricing'
              className='flex items-center justify-center gap-2 px-6 py-2 text-base font-medium text-indigo-600 underline-offset-2 hover:underline md:px-8 md:py-3 md:text-lg'
            >
              View Prices
            </Link> */}
          </div>
        </div>
        <RoomList />
      </div>
    </section>
  )
}
