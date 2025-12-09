import { useState } from 'react'

const ReviewCard = ({ testimonial, StarIcon }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = testimonial.quote.length > 180

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
        </div>
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>
      <blockquote className="text-slate-700 text-sm leading-relaxed mb-4 flex-grow">
        "{expanded || !isLong ? testimonial.quote : `${testimonial.quote.substring(0, 180)}...`}"
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-emerald-700 font-medium ml-1 hover:underline cursor-pointer"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-stone-100 mt-auto">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <span className="text-emerald-700 font-semibold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please call us at (916) 767-0216.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const StarIcon = ({ filled = true }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 max-w-lg text-center shadow-xl border border-stone-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-4">You're All Set</h2>
          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            One of our property management experts will reach out within 24 hours with your personalized rental analysis.
          </p>
          <div className="pt-6 border-t border-stone-100">
            <p className="text-slate-500">
              Questions? Call us at{' '}
              <a href="tel:+19167670216" className="text-emerald-700 font-semibold hover:underline">
                (916) 767-0216
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Header */}
      <header className="py-4 px-6 border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src="https://propertymanagementsacramentoca.com/wp-content/uploads/2025/03/site-logo.svg"
            alt="Sacramento Property Management Group"
            className="h-10 md:h-12"
          />
          <a
            href="tel:+19167670216"
            className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">(916) 767-0216</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-800 text-sm font-medium">Serving Sacramento, Placer & El Dorado Counties</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-slate-900 leading-[1.1] mb-6">
                Your Property Deserves Tenants Who Pay{' '}
                <span className="text-emerald-700">— And Stay.</span>
              </h1>

              <p className="text-xl text-slate-600 mb-4 leading-relaxed">
                Finding reliable tenants is hard. Keeping them is harder. We handle the screening, the leasing, the rent collection, and the late-night emergencies — so your investment actually works for you.
              </p>

              <p className="text-lg text-emerald-700 font-medium mb-8">
                Get a free rental analysis and see what your property should be earning.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-stone-200 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <span className="text-slate-700 font-medium">65+ Reviews</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">94% Occupancy</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">Licensed DRE #02243502</span>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                {[
                  'No management fees while your property is vacant',
                  'Rigorous screening: income, credit, background, and rental history verified',
                  '24/7 owner portal with real-time financial reporting'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
                    Get Your Free Rental Analysis
                  </h2>
                  <p className="text-slate-500">
                    See what your property should be earning. No obligation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="(916) 555-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="123 Main St, Sacramento, CA"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 hover:shadow-emerald-800/30 disabled:opacity-70 mt-6 cursor-pointer"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        Get My Free Analysis
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-red-600 text-sm mt-3 text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </p>
                  )}
                </form>

                <p className="text-xs text-slate-400 mt-4 text-center">
                  Your information is secure and will never be shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/50">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beautiful residential home in Sacramento"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-xl md:text-2xl font-serif font-medium max-w-2xl">
                "Professional management for residential properties across the Greater Sacramento area."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4">
              Why Property Owners Choose Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We treat your investment like our own — with care, expertise, and complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Rigorous Tenant Screening',
                description: 'Comprehensive verification including income, credit, rental history, and background checks on every applicant. We place tenants who pay on time and respect your property.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'No Fees While Vacant',
                description: "You only pay management fees when you're earning rent. We're motivated to fill your property quickly with the right tenant — because we don't get paid until you do."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Transparent Reporting',
                description: 'Access your property\'s financial data 24/7 through our owner portal. See rent collections, maintenance expenses, and distributions in real-time. No surprises, ever.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8 border border-stone-100 hover:shadow-lg hover:shadow-stone-200/50 transition-shadow">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4">
              Trusted by Property Owners
            </h2>
            <p className="text-lg text-slate-600">
              Don't just take our word for it — hear from our satisfied clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Highly recommend this property management for people who plan to rent out their home for the first time! My meetings with Mark and conversations with George were always organized and respectful making the home prep process seamless. On top of that, I felt comfortable, trusting them as they were honest, transparent and dependable. Kudos for a stellar job!",
                name: "Gloria"
              },
              {
                quote: "We've had an outstanding experience with SPMG Property Management managing our rental home in Rocklin. Their team is professional, responsive, and highly knowledgeable about the Rocklin property management landscape. SPMG quickly found well qualified tenants for our Rocklin property and made the entire leasing process seamless.",
                name: "Troy S."
              },
              {
                quote: "We've had an excellent experience working with Sacramento Property Management Group for my rental property. Their team is professional, responsive, and highly knowledgeable in Rocklin property management. They quickly found great tenants and handle all aspects of property maintenance and tenant communication with care.",
                name: "Ben Ben Hamu"
              },
              {
                quote: "It's been a pleasure working with and trusting SPMG to manage my property. They found great tenants quickly and have handled everything with care. Highly recommend them to any property owner looking for reliable management in the area.",
                name: "Alex R."
              },
              {
                quote: "I've had a great experience with Sacramento Property Management Group. They're professional, responsive, and take care of everything quickly and efficiently. It's such a relief knowing my property is in good hands. I really appreciate how easy they make the whole process—highly recommend!",
                name: "Karina Krivitchenko"
              },
              {
                quote: "My experience with SPMG Property Management has been consistently awesome. Their professionalism, proactive approach to issues, and clear communication have made managing my property stress-free. Their financial reporting and tenant management have significantly increased the value of my investment.",
                name: "John Maley"
              },
              {
                quote: "Sacramento Property Management Group has been a pleasure to work with. They are professional, responsive, and consistently go above and beyond to meet our property needs. Their attention to detail ensures that our properties are always well-maintained, and tenant issues are resolved quickly.",
                name: "David Naumchuk"
              },
              {
                quote: "Writing this as a tenant of a property, sacramentopmg has been the best management company I've worked with! Mark and his team were incredibly helpful and made the entire application and move in process completely stress-free. I highly recommend them to anyone looking for a reliable and professional property management company!",
                name: "Mads"
              },
              {
                quote: "Not only were they incredibly easy to work with, but their level of professionalism and dedication to providing top-notch customer service truly impressed me. From the moment I reached out for assistance, they were prompt in their responses and went above and beyond to ensure that my needs were met.",
                name: "Dmitriy Matushevskiy"
              },
              {
                quote: "I highly recommend working with George, whether you have one rental, or a large portfolio to manage, they will do a great job!",
                name: "Shaun Hill"
              },
              {
                quote: "SPMG was a pleasure to work with while renting my property. They ensured it was rented quickly and answered all of my questions and concerns throughout the entire process.",
                name: "Ben Gunther"
              },
              {
                quote: "Very easy to work with. Communication was excellent. Customer service was top notch. They listened to our needs and delivered!",
                name: "Good Home Construction"
              },
              {
                quote: "I had a great experience working with Sacramento Property Management Group. They answered all my questions. They were professional and responsive.",
                name: "Barbara Layton"
              }
            ].map((testimonial, i) => (
              <ReviewCard key={i} testimonial={testimonial} StarIcon={StarIcon} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4">
              Getting Started is Easy
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to stress-free property management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Request Your Free Analysis',
                description: 'Fill out the form above with your property details. We\'ll analyze your property and local market conditions.'
              },
              {
                step: '2',
                title: 'Review Your Options',
                description: 'We\'ll send your personalized rental analysis and walk through our services. No pressure, no obligation.'
              },
              {
                step: '3',
                title: 'Sit Back & Earn',
                description: 'We handle everything — marketing, showings, screening, leasing, maintenance, and rent collection.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-serif font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What do you charge for property management?',
                answer: '8% of monthly rent collected for full-service management, plus 50% of first month\'s rent for tenant placement. No fees while your property is vacant — we only earn when you do.'
              },
              {
                question: 'How do you find and screen tenants?',
                answer: 'We market your property across 20+ platforms including Zillow, Trulia, and local MLS. Every applicant undergoes rigorous screening: income verification (3x rent), credit check, rental history verification, and background check.'
              },
              {
                question: 'What if I already have a tenant in place?',
                answer: 'No problem. We handle mid-lease takeovers seamlessly. We\'ll review the existing lease, introduce ourselves to your tenant, and assume all management duties without disruption.'
              },
              {
                question: 'What areas do you serve?',
                answer: 'We manage properties throughout Sacramento, Roseville, Rocklin, Auburn, Folsom, Elk Grove, Citrus Heights, Rancho Cordova, Lincoln, and surrounding areas in Sacramento, Placer, and El Dorado counties.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-stone-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-24 bg-emerald-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Ready to Maximize Your Rental Income?
          </h2>
          <p className="text-emerald-100 text-xl mb-8 leading-relaxed">
            Get your free rental analysis today. No obligation, no pressure — just expert guidance for your investment property.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold py-4 px-8 rounded-xl hover:bg-emerald-50 transition-all shadow-lg cursor-pointer"
          >
            Get My Free Analysis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://propertymanagementsacramentoca.com/wp-content/uploads/2025/03/site-logo.svg"
              alt="Sacramento PMG"
              className="h-8 brightness-0 invert opacity-80"
            />
            <span className="text-slate-400 text-sm">© 2025 Sacramento Property Management Group</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <span>DRE #02243502</span>
            <span>•</span>
            <a href="tel:+19167670216" className="hover:text-white transition-colors">(916) 767-0216</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
