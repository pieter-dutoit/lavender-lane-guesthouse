import { getReviews } from '@/lib/data'
import SectionHeading from './section-heading'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default async function Reviews() {
  const reviews = await getReviews()
  if (!reviews) return <></>

  return (
    <section className='bg-white py-12 lg:py-20' id='reviews'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='What Our Guests Say'
          heading='Reviews from Satisfied Visitors'
          description='Authentic reviews from platforms like Booking.com, Google, and LekkeSlaap.'
        />

        <ul className='mt-16 grid gap-12 sm:grid-cols-2 md:gap-20 lg:mt-20 lg:grid-cols-2'>
          {reviews.map(({ id, name, title, text, platform, link }) => {
            return (
              <li key={id} className='flex flex-col items-center text-center'>
                <p className='text-gray-500 italic lg:text-lg'>
                  {title && (
                    <strong className='font-semibold'>
                      {title}
                      {' - '}
                    </strong>
                  )}
                  “{text}”
                </p>
                <strong className='mt-2 font-extrabold md:mt-4'>{name}</strong>

                {platform && link ? (
                  <Link
                    href={link}
                    className='flex items-center text-xs underline underline-offset-2'
                    target='_blank'
                  >
                    Read on {platform} <ExternalLink size={12} />
                  </Link>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
