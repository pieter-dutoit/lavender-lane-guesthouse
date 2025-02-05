import ContactUs from './components/contact-us'
import Facilities from './components/facilities'
import Hero from './components/hero'
import Reviews from './components/reviews'
import Rooms from './components/rooms'

export default async function Page() {
  return (
    <>
      <Hero />
      <Facilities />
      <Rooms />
      <Reviews />
      <ContactUs />
    </>
  )
}
