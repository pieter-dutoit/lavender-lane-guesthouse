import SectionHeader from '../../components/section-header'

export default function Team() {
  return (
    <section className='bg-gradient-to-b from-indigo-50 to-gray-100 py-12 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Who we are'
          heading='Meet Our Team'
          description="The heart of Lavender Lane's hospitality"
        />
        <ul className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-10'>
          {[
            { name: 'Mienie du Toit', role: 'Owner' },
            { name: 'Madeleine de Waal', role: 'Owner' },
            { name: 'Izandri Janse van Vuuren', role: 'Administration' }
          ].map((member) => (
            <li key={member.name} className='text-center'>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <h3 className='text-lg font-medium text-gray-900'>
                  {member.name}
                </h3>
                <p className='text-indigo-600'>{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
