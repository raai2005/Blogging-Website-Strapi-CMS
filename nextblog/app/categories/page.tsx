export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          Categories
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Browse all available categories
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Categories will be fetched from Strapi */}
          <p className="text-zinc-500 dark:text-zinc-500 col-span-full">
            Categories from Strapi CMS will be displayed here...
          </p>
        </div>
      </div>
    </div>
  );
}
