import ContactDetails from './components/contact-details'
import SocialMedia from './components/social-media'

export default function ContactUsPage() {
  return (
    <>
      <h1 className='sr-only'>We&apos;d love to hear from you</h1>
      <ContactDetails />
      <SocialMedia />
    </>
  )
}
