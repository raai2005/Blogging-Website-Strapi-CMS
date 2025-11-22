"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getPostsByTag } from "@/lib/api";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function TagPage({ params }: TagPageProps) {
  const { slug } = use(params);
  const [tag, setTag] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { tag: tagData, posts: postsData } = await getPostsByTag(slug);
        setTag(tagData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading tag:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const tagAttrs = tag?.attributes || tag || {};
  const tagName = tagAttrs.name || tag?.name || slug;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
          #{tagName}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          All posts tagged with this topic
        </p>

        {posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => {
              const attributes = post.attributes || post;
              const slug = attributes.slug || post.slug || post.id;
              const title = attributes.title || post.title || 'Untitled Post';
              const excerpt = attributes.excerpt || post.excerpt || '';
              const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
              
              return (
                <article key={post.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${slug}`}>
                    <h2 className="text-2xl font-bold mb-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {excerpt}
                    </p>
                    <div className="text-sm text-zinc-500">
                      {new Date(publishedAt).toLocaleDateString()}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-500">
            No posts found with this tag.
          </p>
        )}
      </div>
    </div>
  );
}
