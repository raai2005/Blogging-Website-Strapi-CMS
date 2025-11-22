export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          About Us
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
            Welcome to our blog! This is where we share insights, stories, and knowledge
            about topics we're passionate about.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">
            Our Mission
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-6">
            Our mission is to provide valuable content that informs, educates, and inspires
            our readers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">
            What We Write About
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-6">
            We cover a wide range of topics including technology, development, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
