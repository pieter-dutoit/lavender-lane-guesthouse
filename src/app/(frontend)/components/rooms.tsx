import Link from 'next/link'
import SectionHeading from './section-heading'
import RoomList from './room-list'

export default function Rooms() {
  return (
    <section className='bg-gray-100 py-12 lg:py-20' id='rooms'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Stay, Work, Recharge'
          heading='Featured Rooms'
          description='Choose from our selection of comfortable rooms, with everything you need to recharge and get ready for the next day.'
        />

        <div className='mt-8 flex justify-center'>
          <Link
            href='/rooms'
            className='inline-block rounded bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700'
          >
            View All Rooms
          </Link>
        </div>

        <RoomList />
      </div>
    </section>
  )
}
