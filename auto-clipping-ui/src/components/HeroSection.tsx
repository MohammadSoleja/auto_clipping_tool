'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Auto Clipping Tool
      </motion.h1>

      <motion.p
        className="text-lg mb-8 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Instantly generate short, shareable clips from long-form videos using AI-powered transcription and smart filtering.
      </motion.p>

      <motion.button
        className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Try it now
      </motion.button>
    </section>
  );
}
