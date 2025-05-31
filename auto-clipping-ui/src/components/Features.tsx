'use client';

import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Features
        </motion.h2>
        <motion.p
          className="text-lg mb-12 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Powerful tools to help you create impactful short-form content with ease.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-3 text-left">
          {[
            {
              title: 'AI-Powered Transcription',
              desc: 'Accurate and fast transcriptions using Whisper by OpenAI.',
            },
            {
              title: 'Smart Clip Detection',
              desc: 'Segments are dynamically grouped by sentence and meaning.',
            },
            {
              title: 'Keyword Filtering',
              desc: 'Clips are filtered using context-aware keyword extraction with KeyBERT.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
