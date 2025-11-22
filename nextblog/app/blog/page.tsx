export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Blog Posts
        </h1>
        
        <div className="grid gap-8">
          {/* Blog posts will be fetched from Strapi */}
          <p className="text-zinc-600 dark:text-zinc-400">
            Blog posts will be loaded here from Strapi CMS...
          </p>
        </div>
      </div>
    </div>
  );
}
