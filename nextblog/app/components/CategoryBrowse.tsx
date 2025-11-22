"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";

export default function CategoryBrowse() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Browse by Category
          </h2>
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
        </div>
        <p className="text-zinc-400 text-lg">Find content that interests you most</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
      >
        {categories.map((category) => {
          const attributes = category.attributes || category;
          const slug = attributes.slug || category.slug || category.id;
          const name = attributes.name || category.name || 'Category';
          const icon = attributes.icon || category.icon || '📂';
          
          return (
            <motion.div key={category.id || slug} variants={item}>
              <Link
                href={`/category/${slug}`}
                className="block group relative p-7 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800/50 rounded-2xl hover:border-violet-500/50 transition-all duration-300 text-center overflow-hidden hover:scale-105 transform shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <h3 className="font-bold text-white group-hover:text-violet-300 transition-colors text-lg mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-zinc-500 flex items-center justify-center gap-1.5">
                    View posts
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
