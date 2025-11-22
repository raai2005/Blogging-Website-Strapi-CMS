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
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
          Browse by Category
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">Find content that interests you</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
                className="block group p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center"
              >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                View posts
              </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
