"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getFeaturedPost } from "@/lib/api";
import { getCoverImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function FeaturedPost() {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const featuredPost = await getFeaturedPost();
        setPost(featuredPost);
      } catch (error) {
        console.error('Error loading featured post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-12">
          <p className="text-zinc-400">Loading featured post...</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return null;
  }

  const attributes = post.attributes || post;
  const slug = attributes.slug || post.slug || post.id;
  const title = attributes.title || post.title || 'Featured Post';
  const excerpt = attributes.excerpt || post.excerpt || '';
  const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
  const readTime = attributes.readTime || post.readTime || '5 min read';
  const coverImageUrl = getCoverImageUrl(post);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured Post
          </h2>
        </div>
        <p className="text-zinc-400 text-lg ml-7">Don't miss our top story of the week</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/50 hover:border-violet-500/30 transition-all duration-500"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-72 md:h-auto bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="text-white text-7xl">📸</span>
                <span className="text-white/70 text-sm">Featured Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent md:hidden"></div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium backdrop-blur-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-5 text-white group-hover:text-violet-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <Link
              href={`/blog/${slug}`}
              className="group/btn inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold w-fit shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transform"
            >
              Read Full Article
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
