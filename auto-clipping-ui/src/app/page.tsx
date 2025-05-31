export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">Auto Clipping Tool</h1>
        <p className="text-lg mb-8 max-w-xl">
          Instantly generate short, shareable clips from long-form videos
          using AI-powered transcription and smart filtering.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
          Try it now
        </button>
      </section>
    </main>
  );
}
