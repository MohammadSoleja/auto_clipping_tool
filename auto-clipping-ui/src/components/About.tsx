'use client';

import {motion} from 'framer-motion';

export default function About() {
    return (
        <section className="px-6 py-24 bg-gray-100 dark:bg-zinc-900 text-center text-gray-900 dark:text-gray-100">
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-4xl font-bold mb-4">About</h2>
                <p className="text-lg leading-relaxed">
                    Auto Clipping Tool is designed to make content creation faster and more efficient.
                    Whether you're a podcaster, educator, or content creator, our tool helps you extract
                    engaging highlights from lengthy videos using AI-powered transcription and intelligent filtering.
                </p>
            </motion.div>
        </section>
    );
}