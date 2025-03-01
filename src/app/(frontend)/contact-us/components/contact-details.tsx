import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { getContacts } from '@/lib/data'
import { extractContactDetails } from '@/lib/utils'
import SectionHeading from '../../components/section-heading'

export default async function ContactDetails() {
  const data = await getContacts()
  const contacts = extractContactDetails(data)

  return (
    <section className='bg-gradient-to-b from-gray-200 to-white py-12 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Get in touch'
          heading='Contact Us'
          description='Get in touch with us for bookings or any inquiries.'
        />

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Email & Phone Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
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

            {/* Address */}
            <h3 className='mt-4 text-xl font-semibold'>Address</h3>

            <div className='mt-4 flex flex-col gap-4'>
              <p>
                17 Nieshout Street
                <br /> Kathu
                <br /> 8446
                <br /> South Africa
              </p>
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

          {/* Maps Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='text-xl font-semibold'>Location</h3>
            <div className='aspect-w-16 aspect-h-9 mt-4'>
              <iframe
                title='Guesthouse Map Location'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.713546327411!2d23.049549075467016!3d-27.695247076189478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9e412976e47095%3A0xef41f10a6cf9bd04!2sLavender%20Lane!5e0!3m2!1sen!2sau!4v1738724043279!5m2!1sen!2sau'
                width='600'
                height='300'
                style={{ border: 0 }}
                allowFullScreen={false}
                loading='eager'
                referrerPolicy='no-referrer-when-downgrade'
                className='h-full w-full rounded-md md:min-h-80'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
