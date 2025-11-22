"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default function CategoriesPage() {
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

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          Categories
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Browse all available categories
        </p>

        {loading ? (
          <p className="text-zinc-500">Loading categories...</p>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const attributes = category.attributes || category;
              const slug = attributes.slug || category.slug || category.id;
              const name = attributes.name || category.name || 'Category';
              const icon = attributes.icon || category.icon || '📂';
              const description = attributes.description || category.description || 'Explore posts in this category';
              
              return (
                <Link
                  key={category.id || slug}
                  href={`/category/${slug}`}
                  className="block p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:shadow-lg transition-shadow border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {name}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {description}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-500">
            No categories available yet. Create categories in Strapi CMS.
          </p>
        )}
      </div>
    </div>
  );
}
