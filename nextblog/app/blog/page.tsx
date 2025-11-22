"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/api";

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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Blog Posts
        </h1>
        
        {loading ? (
          <p className="text-zinc-600 dark:text-zinc-400">Loading posts...</p>
        ) : posts.length > 0 ? (
          <>
            <div className="grid gap-8">
              {posts.map((post) => {
                const attributes = post.attributes || post;
                const slug = attributes.slug || post.slug || post.id;
                const title = attributes.title || post.title || 'Untitled Post';
                const excerpt = attributes.excerpt || post.excerpt || '';
                const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
                const category = attributes.category?.data || post.category?.data;
                const categoryName = category?.attributes?.name || category?.name;
                
                return (
                  <article key={post.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${slug}`}>
                      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        {title}
                      </h2>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span>{new Date(publishedAt).toLocaleDateString()}</span>
                        {categoryName && (
                          <span>• {categoryName}</span>
                        )}
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
            
            {pagination && pagination.pageCount > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {currentPage} of {pagination.pageCount}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.pageCount, p + 1))}
                  disabled={currentPage === pagination.pageCount}
                  className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No blog posts available yet. Create posts in Strapi CMS.
          </p>
        )}
      </div>
    </div>
  );
}
