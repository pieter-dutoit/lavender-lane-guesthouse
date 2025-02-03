interface Props {
  heading: string
  subHeading: string
  description: string
}

export default function SectionHeader({
  heading,
  subHeading,
  description
}: Props) {
  return (
    <div className='text-center'>
      <h2 className='font-extrabold tracking-wide text-indigo-600 uppercase sm:text-lg'>
        {heading}
      </h2>
      <p className='mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl'>
        {subHeading}
      </p>
      <p className='mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto lg:mt-5 lg:text-xl'>
        {description}
      </p>
    </div>
  )
}
