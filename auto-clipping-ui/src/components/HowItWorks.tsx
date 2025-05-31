'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
return (
<section className="py-24 px-6 bg-white dark:bg-black">
<div className="max-w-5xl mx-auto text-center">
<motion.h2
className="text-3xl md:text-4xl font-bold mb-6"
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
viewport={{ once: true }}
>
How It Works
</motion.h2>
<motion.p
className="text-lg mb-12 text-gray-700 dark:text-gray-300"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2, duration: 0.5 }}
viewport={{ once: true }}
>
Just upload your video and let our pipeline do the magic.
</motion.p>

    <div className="grid gap-10 md:grid-cols-3 text-left">
      {[
        {
          step: '1. Transcribe',
          desc: 'Audio is transcribed using Whisper, generating accurate segments.',
        },
        {
          step: '2. Extract Keywords',
          desc: 'KeyBERT analyzes each segment and highlights top keywords.',
        },
        {
          step: '3. Generate Clips',
          desc: 'Clips are created based on dynamic grouping and relevance.',
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-6 shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + idx * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
          <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
);
}