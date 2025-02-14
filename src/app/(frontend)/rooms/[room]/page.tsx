import { notFound } from 'next/navigation'

import { getRoom, getRooms } from '@/lib/data'

import PageHeading from '../../components/page-heading'
import RoomDetails from './components/room-details'

type Props = { params: Promise<{ room: string }> }

export async function generateStaticParams() {
  const rooms = await getRooms()

  return rooms.map((room) => ({
    room: room.slug
  }))
}

export default async function RoomTypePage({ params }: Props) {
  const { room: slug } = await params
  const room = await getRoom(slug)
  if (!room) {
    notFound()
  }

  const { name, details } = room

  return (
    <>
      <PageHeading
        className='bg-indigo-100 py-8 lg:py-12'
        description={`Sleeps ${details.sleeps_adults + details.sleeps_children}`}
      >
        {name}
      </PageHeading>
      <RoomDetails room={room} />
    </>
  )
}
