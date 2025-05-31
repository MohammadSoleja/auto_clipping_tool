# scripts/process_video.py

import os
import sys

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from clipper.transcription.transcribe import transcribe_audio
from clipper.keywords.extract_keywords import extract_keywords_from_segment
from clipper.utils.segment_utils import split_segments_by_sentence
from clipper.clipping.clip import clip_video

def process_video(video_filename: str):
    video_path = os.path.join("auto-clipping-ui", "public", "uploads", video_filename)


    if not os.path.exists(video_path):
        raise FileNotFoundError(f"File not found: {video_path}")

    print(f"[Step 1] Transcribing: {video_path}")
    segments = transcribe_audio(video_path)

    print(f"[Step 2] Extracting keywords")
    for seg in segments:
        seg['keywords'] = extract_keywords_from_segment(seg['text'], top_n=3)

    print(f"[Step 3] Splitting segments")
    grouped = split_segments_by_sentence(segments, min_duration=5.0, max_duration=30.0)

    print(f"[Step 4] Recombining into final segments")
    final_segments = []
    for group in grouped:
        if not group:
            continue
        combined_text = " ".join([s['text'] for s in group])
        keywords = [k.strip().lower() for s in group for k in s.get("keywords", []) if isinstance(k, str)]
        unique_keywords = list(set(keywords))

        final_segments.append({
            "start": group[0]["start"],
            "end": group[-1]["end"],
            "text": combined_text,
            "keywords": unique_keywords
        })

    print(f"[Step 5] Clipping")
    clip_video(
        input_path=video_path,
        segments=final_segments,
        output_dir="public/clips",
        min_duration=5.0,
        max_duration=30.0,
        keyword_threshold=1
    )

    print("✅ Done!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/process_video.py <video_filename>")
        sys.exit(1)

    process_video(sys.argv[1])
