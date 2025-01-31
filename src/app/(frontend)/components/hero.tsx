import Link from 'next/link'

export default function Hero() {
  return (
    <div className='relative overflow-hidden bg-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32'>
          <main className='mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block'>Welcome to </span>
                <span className='block text-indigo-600'>
                  Lavender Lane Guesthouse
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>
                Experience comfort and tranquility in our charming guesthouse.
                Perfect for your next getaway.
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <Link
                    href='#'
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg'
                  >
                    Book Now
                  </Link>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Link
                    href='#amenities'
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:px-10 md:py-4 md:text-lg'
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
        {/* <Image
          className='h-56 w-full bg-purple-100 object-cover sm:h-72 md:h-96 lg:h-full lg:w-full'
          src='/placeholder.svg?height=600&width=800'
          alt='Guesthouse exterior'
          width={800}
          height={600}
        /> */}
      </div>
    </div>
  )
}
