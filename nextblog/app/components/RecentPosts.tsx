"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRecentPosts } from "@/lib/api";
import { getCoverImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function RecentPosts() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getRecentPosts(6);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-4">
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
              Latest Posts
            </h2>
            <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-zinc-400 text-lg">Discover our most recent articles and insights</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg mb-4">
              Loading posts...
            </p>
          </div>
        ) : blogPosts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {blogPosts.map((post) => {
              const attributes = post.attributes || post;
              const slug = attributes.slug || post.slug || post.id;
              const title = attributes.title || post.title || 'Untitled Post';
              const excerpt = attributes.excerpt || post.excerpt || 'No excerpt available';
              const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt || new Date();
              const readTime = attributes.readTime || post.readTime || '5 min read';
              const coverImageUrl = getCoverImageUrl(post);
              
              return (
                <motion.article
                  key={post.id}
                  variants={item}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-zinc-800/50 hover:border-violet-500/30"
                >
                  <Link href={`/blog/${slug}`} className="block">
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-violet-600/20 to-purple-700/20">
                      {coverImageUrl ? (
                        <Image
                          src={coverImageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                          <span className="text-6xl">📝</span>
                        </div>
                      )}
                      {(attributes.category?.data || post.category?.data) && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1.5 bg-zinc-900/90 backdrop-blur-sm text-white rounded-lg text-xs font-semibold shadow-lg border border-zinc-700/50">
                            {(attributes.category?.data || post.category?.data)?.attributes?.name || (attributes.category?.data || post.category?.data)?.name}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors line-clamp-2 leading-tight">
                        {title}
                      </h3>
                      <p className="text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800/50">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg mb-4">
              No blog posts available yet. Create posts in Strapi CMS.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transform"
          >
            View All Posts
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}