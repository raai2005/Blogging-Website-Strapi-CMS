"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getHeroContent } from "@/lib/api";

export default function Hero() {
  const [heroContent, setHeroContent] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const data = await getHeroContent();
      if (data) {
        setHeroContent(data.attributes || data);
      }
    };
    fetchHero();
  }, []);

  // Default content if Strapi is not connected or empty
  const title = heroContent?.title || (
    <>
      Discover Amazing
      <br />
      <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
        Stories
      </span>
    </>
  );
  
  const description = heroContent?.description || "Explore insightful articles, tutorials, and stories crafted with care";
  const ctaText = heroContent?.ctaText || "Explore Blog Posts";
  const ctaLink = heroContent?.ctaLink || "/blog";

  return (
    <section className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 py-24 md:py-36 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-medium backdrop-blur-sm">
            ✨ Powered by Next.js & Strapi CMS
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={ctaLink}
            className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transform"
          >
            <span className="flex items-center justify-center gap-2">
              {ctaText}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          <Link
            href="/categories"
            className="px-8 py-4 bg-zinc-800/50 text-white border-2 border-zinc-700 rounded-xl hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform"
          >
            Browse Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
