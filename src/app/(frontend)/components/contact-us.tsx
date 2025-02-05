import { Mail, Phone } from 'lucide-react'
import SectionHeader from './section-header'
import Link from 'next/link'

export default function ContactUs() {
  return (
    <section className='bg-gray-100 py-12 lg:py-20' id='contact-us'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Get in touch'
          heading='Contact Us'
          description='Get in touch with us for bookings or any inquiries.'
        />

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Email & Phone Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-xl font-semibold'>Contact Information</h3>
            <div className='space-y-4'>
              <Link
                href='mailto:info@lavenderlanekathu.co.za'
                className='flex items-center'
              >
                <Mail className='mr-2 h-6 w-6 text-indigo-600' />
                <span>info@lavenderlanekathu.co.za</span>
              </Link>
              <Link href='tel:+27673558676' className='flex items-center'>
                <Phone className='mr-2 h-6 w-6 text-indigo-600' />
                <span>067 355 8676</span>
              </Link>
            </div>
          </div>

          {/* Maps Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-xl font-semibold'>Location</h3>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1834048039988!2d-73.98651552422904!3d40.75899663441544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1706727359928!5m2!1sen!2sus'
                width='600'
                height='450'
                style={{ border: 0 }}
                allowFullScreen={false}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='size-full rounded-md'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
