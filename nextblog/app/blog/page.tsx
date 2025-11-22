"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/api";
import { getCoverImageUrl, getFallbackImageUrl } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { posts: data, pagination: paginationData } = await getAllBlogPosts(currentPage, 10);
        setPosts(data);
        setPagination(paginationData);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 py-16 md:py-24 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              All Articles
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Blog Posts
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Explore our latest articles, tutorials, and insights
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-400">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, index) => {
                const attributes = post.attributes || post;
                const slug = attributes.slug || post.slug || post.id;
                const title = attributes.title || post.title || 'Untitled Post';
                const excerpt = attributes.excerpt || post.excerpt || '';
                const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
                const readTime = attributes.readTime || post.readTime || '5 min read';
                const category = attributes.category?.data || post.category?.data;
                const categoryName = category?.attributes?.name || category?.name;
                const coverImageUrl = getCoverImageUrl(post);

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                            unoptimized
                            onError={(e) => {
                              console.error('Image failed to load:', coverImageUrl);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                            <span className="text-6xl">📝</span>
                          </div>
                        )}
                        {categoryName && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1.5 bg-zinc-900/90 backdrop-blur-sm text-white rounded-lg text-xs font-semibold shadow-lg border border-zinc-700/50">
                              {categoryName}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors line-clamp-2 leading-tight">
                          {title}
                        </h2>
                        <p className="text-zinc-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800/50">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
            </div>
            
            {pagination && pagination.pageCount > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
              >
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 px-6 py-3 bg-zinc-800/50 text-white rounded-xl hover:bg-zinc-700/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700/50"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="px-6 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-300 rounded-xl font-semibold backdrop-blur-sm">
                  Page {currentPage} of {pagination.pageCount}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.pageCount, p + 1))}
                  disabled={currentPage === pagination.pageCount}
                  className="group flex items-center gap-2 px-6 py-3 bg-zinc-800/50 text-white rounded-xl hover:bg-zinc-700/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700/50"
                >
                  Next
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800/50 rounded-full mb-6">
              <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-zinc-400 mb-8">
              No blog posts available yet. Create posts in Strapi CMS.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
