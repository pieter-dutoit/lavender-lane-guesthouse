import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  description?: string
  className?: string
}

export default function PageHeading({
  children,
  description,
  className
}: Props) {
  return (
    <section
      className={twMerge('bg-white py-12 text-center lg:py-20', className)}
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <h1 className='mb-4 text-3xl font-extrabold text-black capitalize sm:text-5xl md:text-6xl [&_span]:text-indigo-600'>
          {children}
        </h1>
        {description && (
          <p className='w-full text-lg text-gray-700 lg:text-xl'>
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
