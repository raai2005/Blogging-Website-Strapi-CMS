"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Never Miss a Post
        </h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest articles delivered straight to your inbox
        </p>
        
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-lg text-black dark:text-white bg-white dark:bg-zinc-800 border-2 border-transparent focus:border-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold whitespace-nowrap"
          >
            Subscribe
          </button>
        </motion.form>
        
        <p className="text-sm text-blue-200 dark:text-blue-300 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}
