"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/api";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { posts } = await getAllBlogPosts(1, 100);
        setAllPosts(posts);
      } catch (error) {
        console.error('Error loading posts for search:', error);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allPosts.filter(post => {
        const attrs = post.attributes || post;
        const title = attrs.title || post.title || '';
        const excerpt = attrs.excerpt || post.excerpt || '';
        const content = attrs.content || post.content || '';
        
        const searchText = `${title} ${excerpt} ${content}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      }).slice(0, 5);
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allPosts]);

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 z-50">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 max-h-96 overflow-y-auto">
              {results.map((post) => {
                const attrs = post.attributes || post;
                const slug = attrs.slug || post.slug || post.id;
                const title = attrs.title || post.title || 'Untitled';
                const excerpt = attrs.excerpt || post.excerpt || '';
                
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="block p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                  >
                    <h4 className="font-semibold text-black dark:text-white mb-1 line-clamp-1">
                      {title}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="p-4 text-center text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
