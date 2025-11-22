"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedPost() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
          Featured Post
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">Don't miss our top story</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-6xl">📸</span>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">
              Your Featured Blog Post Title
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-lg">
              This is a preview of your most important or recent post. It will be fetched from Strapi CMS...
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500 mb-6">
              <span>5 min read</span>
              <span>•</span>
              <span>Nov 22, 2025</span>
            </div>
            <Link
              href="/blog/featured-post"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold w-fit"
            >
              Read More →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
