interface Props {
  label?: string
  heading: string
  description?: string
}

export default function SectionHeading({ label, heading, description }: Props) {
  return (
    <div className='text-center'>
      {label && (
        <span className='font-extrabold tracking-wide text-indigo-600 uppercase sm:text-lg'>
          {label}
        </span>
      )}
      <h2 className='mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:mt-4 lg:text-5xl'>
        {heading}
      </h2>
      {description && (
        <p className='mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto lg:mt-5 lg:text-xl'>
          {description}
        </p>
      )}
    </div>
  )
}
