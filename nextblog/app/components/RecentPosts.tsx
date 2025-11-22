"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function RecentPosts() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Blog posts will be fetched from Strapi CMS
  const blogPosts: any[] = [];

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
            Latest Posts
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">Discover our most recent articles</p>
        </motion.div>

        {blogPosts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    {/* Image will be loaded from Strapi */}
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                      <span className="text-6xl">📝</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-full text-xs font-semibold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
              No blog posts available yet. Posts will be loaded from Strapi CMS.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}