interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
          Category: {params.slug}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          All posts in this category
        </p>

        <div className="grid gap-8">
          {/* Posts filtered by category will be displayed here */}
          <p className="text-zinc-500 dark:text-zinc-500">
            Posts from Strapi CMS will be loaded here...
          </p>
        </div>
      </div>
    </div>
  );
}
