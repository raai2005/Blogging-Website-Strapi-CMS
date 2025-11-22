interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          Blog Post: {params.slug}
        </h1>
        
        <div className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <time>Published on: Date</time>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-zinc-700 dark:text-zinc-300">
            Blog post content will be loaded from Strapi CMS...
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Tags:</span>
            {/* Tags will be displayed here */}
          </div>
        </div>
      </article>
    </div>
  );
}
