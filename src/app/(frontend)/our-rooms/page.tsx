// import Pricing from './components/pricing'
import Hero from '../about-us/components/hero'
import Rooms from './components/rooms'

export default function OurRoomsPage() {
  return (
    <>
      <Hero
        heading='Find your home away from home'
        description='Experience comfort and style in our thoughtfully designed rooms.'
        className='bg-gray-200'
      />
      <Rooms />
      {/* <Pricing /> */}
    </>
  )
}
