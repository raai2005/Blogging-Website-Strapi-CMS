export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 py-16 md:py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn More
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            About Us
          </h1>
          <p className="text-xl text-zinc-400">
            Learn about our mission, vision, and the team behind this platform
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 md:p-12 border border-zinc-800/50 shadow-2xl mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Welcome to our blog! This is where we share insights, stories, and knowledge
              about topics we're passionate about. Our platform is built with modern technologies
              to provide you with the best reading experience.
            </p>

            <div className="flex items-start gap-4 mb-8 p-6 bg-violet-500/5 border border-violet-500/10 rounded-2xl">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mt-0 mb-3 text-white">
                  Our Mission
                </h2>
                <p className="text-zinc-300 mb-0 leading-relaxed">
                  Our mission is to provide valuable content that informs, educates, and inspires
                  our readers. We strive to create a community where knowledge is shared freely
                  and meaningful conversations take place.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8 p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mt-0 mb-3 text-white">
                  What We Write About
                </h2>
                <p className="text-zinc-300 mb-0 leading-relaxed">
                  We cover a wide range of topics including technology, web development, design,
                  and more. Our content is carefully crafted to provide real value and actionable
                  insights that you can apply in your own projects and life.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mt-0 mb-3 text-white">
                  Built with Modern Technology
                </h2>
                <p className="text-zinc-300 mb-0 leading-relaxed">
                  This platform is powered by <span className="text-white font-semibold">Next.js</span> for the frontend
                  and <span className="text-violet-400 font-semibold">Strapi CMS</span> for content management,
                  ensuring a fast, reliable, and seamless experience for all our readers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-violet-950 to-purple-950 rounded-3xl p-12 border border-violet-500/20">
          <h3 className="text-3xl font-bold text-white mb-4">Want to Learn More?</h3>
          <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
            Have questions or want to get in touch? We'd love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transform"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
