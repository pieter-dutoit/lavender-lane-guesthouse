import Image from 'next/image'
import Link from 'next/link'

const rooms = [
  {
    name: 'Cozy Single Room',
    description:
      'Perfect for solo travelers, this room offers comfort and privacy.',
    image: '/placeholder.svg?height=300&width=400',
    price: '$80'
  },
  {
    name: 'Deluxe Double Room',
    description:
      'Spacious room with a queen-size bed, ideal for couples or friends.',
    image: '/placeholder.svg?height=300&width=400',
    price: '$120'
  },
  {
    name: 'Family Suite',
    description:
      'Large suite with multiple beds, perfect for families or groups.',
    image: '/placeholder.svg?height=300&width=400',
    price: '$180'
  }
]

export default function Rooms() {
  return (
    <div className='bg-gray-100 py-12' id='rooms'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
            Our Rooms
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
            Choose from our selection of comfortable and stylish rooms
          </p>
        </div>
        <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {rooms.map((room) => (
            <div
              key={room.name}
              className='flex flex-col overflow-hidden rounded-lg shadow-lg'
            >
              <div className='flex-shrink-0'>
                <Image
                  className='h-48 w-full object-cover'
                  src={room.image || '/placeholder.svg'}
                  alt={room.name}
                  width={400}
                  height={300}
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {room.name}
                  </h3>
                  <p className='mt-3 text-base text-gray-500'>
                    {room.description}
                  </p>
                </div>
                <div className='mt-6 flex items-center justify-between'>
                  <span className='text-xl font-bold text-gray-900'>
                    {room.price} / night
                  </span>
                  <Link
                    href='#'
                    className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
