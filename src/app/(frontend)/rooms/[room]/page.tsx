import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { getRoom, getRooms, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import PageHeading from '../../components/page-heading'
import RoomDetails from './components/room-details'

type Props = { params: Promise<{ room: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room: slug } = await params
  const data = await getSEOConfig(slug)
  if (!data) return {}
  return createMetadataConfig({ ...data, path: `/rooms/${slug}` })
}

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
