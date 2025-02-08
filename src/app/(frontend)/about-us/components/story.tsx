import SectionHeader from '../../components/section-header'

export default function Story() {
  return (
    <section className='bg-gradient-to-b from-gray-100 to-indigo-50 py-12 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader heading='Our Story' label='About Us' />
        <div className='text-md mx-auto mt-10 flex max-w-3xl flex-col gap-4 font-light md:text-lg lg:mt-16 lg:leading-7'>
          <p>
            Lavender Lane was born out of a passion for hospitality and a desire
            to create a welcoming space for travelers in Kathu. Our guesthouse
            has been thoughtfully designed to provide a comfortable and
            memorable stay for all our guests.
          </p>
          <p>
            With 15 beautifully appointed rooms, including a family room and two
            twin rooms, we cater to a variety of needs. Each room is equipped
            with modern amenities to ensure your stay is as comfortable as
            possible.
          </p>
          <p>
            Our team, with over two decades of experience in the hospitality
            industry, is dedicated to making your stay exceptional. From the
            moment you arrive until your departure, we strive to offer
            personalized service that will make you feel truly at home.
          </p>
        </div>
      </div>
    </section>
  )
}
