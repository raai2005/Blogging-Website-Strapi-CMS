"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white"
        >
          Discover Amazing Stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-10"
        >
          Explore insightful articles, tutorials, and stories crafted with care and powered by Strapi CMS
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/blog"
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold text-lg"
          >
            Explore Blog Posts
          </Link>
          <Link
            href="/categories"
            className="px-8 py-4 bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black dark:border-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-semibold text-lg"
          >
            Browse Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
