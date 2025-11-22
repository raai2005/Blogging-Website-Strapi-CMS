"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "@/lib/api";
import { getCoverImageUrl } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { category: categoryData, posts: postsData } = await getPostsByCategory(slug);
        setCategory(categoryData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const categoryAttrs = category?.attributes || category || {};
  const categoryName = categoryAttrs.name || category?.name || slug;
  const categoryDesc = categoryAttrs.description || category?.description || 'All posts in this category';
  const categoryIcon = categoryAttrs.icon || category?.icon || '📂';

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 py-16 md:py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">{categoryIcon}</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-medium backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {categoryName}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            {categoryDesc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => {
              const attributes = post.attributes || post;
              const slug = attributes.slug || post.slug || post.id;
              const title = attributes.title || post.title || 'Untitled Post';
              const excerpt = attributes.excerpt || post.excerpt || '';
              const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
              const readTime = attributes.readTime || post.readTime || '5 min read';
              
              return (
                <article key={post.id} className="group bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-zinc-800/50 hover:border-violet-500/30 hover:-translate-y-1">
                  <Link href={`/blog/${slug}`}>
                    <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-zinc-500 pt-4 border-t border-zinc-800/50">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readTime}
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800/50 rounded-full mb-6">
              <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Found</h3>
            <p className="text-zinc-400">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
