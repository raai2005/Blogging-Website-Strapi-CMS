"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/api";
import AuthorCard from "@/app/components/AuthorCard";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const attributes = post.attributes || post;
  const title = attributes.title || post.title || 'Untitled Post';
  const content = attributes.content || post.content || '';
  const publishedAt = attributes.publishedAt || post.publishedAt || post.createdAt;
  const readTime = attributes.readTime || post.readTime;
  const viewCount = attributes.viewCount || post.viewCount || 0;
  const coverImage = attributes.coverImage?.data || post.coverImage?.data;
  const coverImageUrl = coverImage?.attributes?.url || coverImage?.url;
  const category = attributes.category?.data || post.category?.data;
  const categorySlug = category?.attributes?.slug || category?.slug;
  const categoryName = category?.attributes?.name || category?.name;
  const tags = attributes.tags?.data || post.tags?.data || [];
  const author = attributes.author?.data || post.author?.data;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <article className="max-w-3xl mx-auto px-4 py-16">
        {coverImageUrl && (
          <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
            <Image
              src={`http://localhost:1337${coverImageUrl}`}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          {title}
        </h1>
        
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <time>{new Date(publishedAt).toLocaleDateString()}</time>
          {categoryName && (
            <>
              <span>•</span>
              <Link href={`/category/${categorySlug}`} className="hover:text-blue-600">
                {categoryName}
              </Link>
            </>
          )}
          {readTime && (
            <>
              <span>•</span>
              <span>📖 {readTime}</span>
            </>
          )}
          {viewCount > 0 && (
            <>
              <span>•</span>
              <span>👁️ {viewCount.toLocaleString()} views</span>
            </>
          )}
        </div>

        {author && (
          <div className="mb-8">
            <AuthorCard author={author} compact={true} />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({...props}) => <h1 className="text-4xl font-bold mt-8 mb-4 text-black dark:text-white" {...props} />,
              h2: ({...props}) => <h2 className="text-3xl font-bold mt-6 mb-3 text-black dark:text-white" {...props} />,
              h3: ({...props}) => <h3 className="text-2xl font-bold mt-5 mb-2 text-black dark:text-white" {...props} />,
              p: ({...props}) => <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed mb-4" {...props} />,
              ul: ({...props}) => <ul className="list-disc list-inside mb-4 text-zinc-700 dark:text-zinc-300" {...props} />,
              ol: ({...props}) => <ol className="list-decimal list-inside mb-4 text-zinc-700 dark:text-zinc-300" {...props} />,
              li: ({...props}) => <li className="mb-2" {...props} />,
              a: ({...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
              code: ({...props}) => <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm" {...props} />,
              pre: ({...props}) => <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
              blockquote: ({...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-zinc-600 dark:text-zinc-400" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Tags:</span>
              {tags.map((tag: any) => {
                const tagAttrs = tag.attributes || tag;
                const tagSlug = tagAttrs.slug || tag.slug || tag.id;
                const tagName = tagAttrs.name || tag.name || 'Tag';
                return (
                  <Link
                    key={tag.id || tagSlug}
                    href={`/tag/${tagSlug}`}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    {tagName}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {author && (
          <div className="mt-8">
            <AuthorCard author={author} />
          </div>
        )}
      </article>
    </div>
  );
}
