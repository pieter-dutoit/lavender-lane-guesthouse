import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import SectionHeading from './section-heading'
import { getContacts } from '@/lib/data'
import { extractContactDetails } from '@/lib/utils'

export default async function ContactUs() {
  const data = await getContacts()
  const contacts = extractContactDetails(data)

  return (
    <section className='bg-gray-100 py-12 lg:py-20' id='contact-us'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Get in touch'
          heading='Contact Us'
          description='Reach out to book your stay or for any inquiries.'
        />

        <div className='mx-auto mt-8 grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-md lg:mt-16 lg:grid-cols-2'>
          {/* Contact details */}
          <div>
            <h3 className='text-xl font-semibold'>Contact Information</h3>
            <ul>
              {contacts.map(({ phone, phoneLink, email }) => (
                <li key={email} className='mt-4 space-y-4'>
                  <Link
                    href={`mailto:${email}`}
                    className='flex items-center gap-2'
                  >
                    <Mail className='size-6 text-indigo-600' />
                    <span>{email}</span>
                  </Link>
                  <Link
                    href={`tel:+27${phoneLink}`}
                    className='flex items-center gap-2'
                  >
                    <Phone className='size-6 text-indigo-600' />
                    <span>{phone}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className='text-xl font-semibold'>Address</h3>
            <div className='mt-4 flex flex-col gap-4'>
              <p> 17 Nieshout Street, Kathu, 8446</p>
              <Link
                href='https://maps.app.goo.gl/KR5bnydJB9HdNGMs8'
                className='flex items-center gap-1 text-indigo-600 underline underline-offset-2'
                target='_blank'
              >
                <MapPin className='size-6' />
                Get Directions
              </Link>
            </div>
          </div>

          {/* CTA */}
          <Link
            href='/contact-us'
            className='mt-4 flex items-center gap-2 font-semibold text-indigo-600 underline-offset-2 hover:underline lg:col-span-2'
          >
            View full contact details <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
