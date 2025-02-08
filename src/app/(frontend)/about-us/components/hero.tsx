interface Props {
  heading: string
  description?: string
  className?: string
}

export default function Hero({ heading, description, className }: Props) {
  return (
    <section className={className}>
      <div className='mx-auto max-w-7xl px-2 py-8 text-center sm:px-6 md:py-12 lg:px-8 lg:py-20'>
        <h1 className='mb-4 text-3xl font-extrabold text-indigo-600 capitalize sm:text-5xl md:text-6xl'>
          {heading}
        </h1>
        {description && (
          <p className='mx-auto max-w-3xl text-lg text-gray-700 lg:text-xl'>
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
