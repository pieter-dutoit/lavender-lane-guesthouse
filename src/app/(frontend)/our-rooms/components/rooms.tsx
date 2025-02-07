import { ExternalLink } from 'lucide-react'
import RoomList from '../../components/room-list'
import SectionHeader from '../../components/section-header'
import Link from 'next/link'

export default function Rooms() {
  return (
    <section className='bg-gray-100 py-12 lg:py-20' id='rooms'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Choose Your Space'
          heading='Our Rooms'
          description='Experience comfort and style in our thoughtfully designed rooms.'
        />
        <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
          <div className='mx-auto rounded-md shadow'>
            <Link
              href='#'
              className='flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-8 md:py-3 md:text-lg'
              target='_blank'
            >
              Check Availability <ExternalLink size={16} />
            </Link>
          </div>
        </div>
        <RoomList />
      </div>
    </section>
  )
}
