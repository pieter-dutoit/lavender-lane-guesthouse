import Link from 'next/link'
import React from 'react'

export default function NotFound(): React.JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 px-4 py-32 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-indigo-600'>Page Not Found</h1>

        <p className='mt-3 text-xl text-gray-500'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className='mt-6'>
          <Link
            href='/'
            className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700'
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
