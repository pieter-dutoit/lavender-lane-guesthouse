import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { getRoom, getRooms, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import {
  createBreadCrumbs,
  getBusinessStructuredData,
  getRoomStructuredData
} from '@/lib/utils/create-structured-data'

import PageHeading from '../../components/page-heading'
import RoomDetails from './components/room-details'
import Breadcrumbs from '../../components/breadcrumbs'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getSEOConfig(slug)
  if (!data) return {}
  return createMetadataConfig({ ...data, path: `/rooms/${slug}` })
}

export async function generateStaticParams() {
  const rooms = await getRooms()

  return rooms.map((room) => ({
    slug: room.slug
  }))
}

export default async function RoomTypePage({ params }: Props) {
  const { slug } = await params
  const room = await getRoom(slug)

  if (!room) {
    notFound()
  }

  const { name, details } = room
  const roomData = await getRoomStructuredData(slug)
  const businessData = await getBusinessStructuredData()

  const crumbs = [
    {
      name: 'Rooms',
      item: '/rooms'
    },
    {
      name,
      item: `/rooms/${room.slug}`
    }
  ]

  const jsonLd = [
    {
      ...businessData,
      containsPlace: roomData
    },
    createBreadCrumbs(crumbs)
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeading
        className='bg-white pb-4 text-left lg:pb-6'
        description={`Sleeps ${details.sleeps_adults + details.sleeps_children}`}
      >
        <span>{name}</span>
      </PageHeading>
      <RoomDetails room={room} />
    </>
  )
}
