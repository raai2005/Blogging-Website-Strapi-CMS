"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/api";
import { getCoverImageUrl } from "@/lib/utils";
import AuthorCard from "@/app/components/AuthorCard";
import SocialShareButtons from "@/app/components/SocialShareButtons";
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-zinc-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800/50 rounded-full mb-6">
            <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">Post Not Found</h1>
          <p className="text-zinc-400 mb-8">The post you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
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
  const coverImageUrl = getCoverImageUrl(post);
  const category = attributes.category?.data || post.category?.data;
  const categorySlug = category?.attributes?.slug || category?.slug;
  const categoryName = category?.attributes?.name || category?.name;
  const tags = attributes.tags?.data || post.tags?.data || [];
  const author = attributes.author?.data || post.author?.data;

  return (
    <div className="min-h-screen bg-zinc-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {coverImageUrl && (
          <div className="relative h-96 md:h-[32rem] mb-12 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/50">
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          </div>
        )}
        
        <div className="mb-8">
          {categoryName && (
            <Link 
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm hover:bg-violet-500/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {categoryName}
            </Link>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 pb-8 border-b border-zinc-800/50">
            <time className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          {readTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime}
              </span>
            </>
          )}
          {viewCount > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {viewCount.toLocaleString()} views
              </span>
            </>
          )}
          </div>
        </div>

        {/* Social Share Buttons */}
        <SocialShareButtons title={title} slug={slug} />

        {author && (
          <div className="mb-10">
            <AuthorCard author={author} compact={true} />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 bg-zinc-900/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-zinc-800/50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({...props}) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />,
              h2: ({...props}) => <h2 className="text-3xl font-bold mt-6 mb-3 text-white" {...props} />,
              h3: ({...props}) => <h3 className="text-2xl font-bold mt-5 mb-2 text-white" {...props} />,
              p: ({...props}) => <p className="text-zinc-300 text-lg leading-relaxed mb-6" {...props} />,
              ul: ({...props}) => <ul className="list-disc list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              ol: ({...props}) => <ol className="list-decimal list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              li: ({...props}) => <li className="mb-2" {...props} />,
              a: ({...props}) => <a className="text-violet-400 hover:text-violet-300 underline underline-offset-2" {...props} />,
              code: ({...props}) => <code className="bg-zinc-800 px-2 py-1 rounded text-sm text-violet-300" {...props} />,
              pre: ({...props}) => <pre className="bg-zinc-800 p-4 rounded-xl overflow-x-auto mb-6 border border-zinc-700" {...props} />,
              blockquote: ({...props}) => <blockquote className="border-l-4 border-violet-500 pl-6 italic my-6 text-zinc-400 bg-zinc-800/50 py-4 rounded-r-lg" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-zinc-800/50">
            <div className="flex gap-3 flex-wrap items-center">
              <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags:
              </span>
              {tags.map((tag: any) => {
                const tagAttrs = tag.attributes || tag;
                const tagSlug = tagAttrs.slug || tag.slug || tag.id;
                const tagName = tagAttrs.name || tag.name || 'Tag';
                return (
                  <Link
                    key={tag.id || tagSlug}
                    href={`/tag/${tagSlug}`}
                    className="px-4 py-2 bg-zinc-800/60 text-zinc-300 rounded-xl text-sm hover:bg-violet-500/20 hover:text-violet-300 hover:border-violet-500/30 border border-zinc-700/50 transition-all duration-300"
                  >
                    #{tagName}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div id="comments" className="mt-12 pt-12 border-t border-zinc-800/50">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comments
          </h2>
          
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800/50 mb-8">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-zinc-300 mb-2">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
              >
                Post Comment
              </button>
            </form>
          </div>

          <div className="text-center py-12 text-zinc-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
          </div>
        </div>

        {author && (
          <div className="mt-12 pt-12 border-t border-zinc-800/50">
            <AuthorCard author={author} />
          </div>
        )}
      </article>
    </div>
  );
}
