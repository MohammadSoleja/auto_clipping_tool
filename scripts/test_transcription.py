import sys
import os

# Add project path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from clipper.transcription.transcribe import transcribe_audio
from clipper.clipping.clip import clip_video
from clipper.keywords.extract_keywords import extract_keywords_from_segment
from clipper.utils.segment_utils import split_segments_by_sentence

# --- Step 1: Transcribe the video ---
video_path = "input/video_clip_long.mp4"
segments = transcribe_audio(video_path)

# --- Step 2: Add keywords to each raw segment ---
for seg in segments:
    seg['keywords'] = extract_keywords_from_segment(seg['text'], top_n=3)
    print(f"Text: {seg['text']}\n → Extracted: {seg['keywords']}")

# --- Step 3: Group segments by sentence-level logic ---
grouped = split_segments_by_sentence(segments, min_duration=5.0, max_duration=30.0)

# --- Step 4: Recombine groups into final segments with combined keywords ---
final_segments = []
for group in grouped:
    if not group:
        continue

    combined_text = " ".join([s['text'] for s in group])

    # Collect and deduplicate all keywords across the group
    all_keywords = []
    for s in group:
        kws = s.get('keywords', [])
        if isinstance(kws, list):
            all_keywords.extend(kws)

    unique_keywords = list(set(k.strip().lower() for k in all_keywords if isinstance(k, str)))

    final_segments.append({
        "start": group[0]["start"],
        "end": group[-1]["end"],
        "text": combined_text,
        "keywords": unique_keywords
    })

# --- Optional Debug ---
for seg in final_segments:
    print(f"[{seg['start']:.2f}s - {seg['end']:.2f}s]: {seg['text']}")
    print(f" → Keywords: {seg.get('keywords', [])}")

# --- Step 5: Generate clips ---
clip_video(
    input_path=video_path,
    segments=final_segments,
    min_duration=5.0,
    max_duration=30.0,
    keyword_threshold=1,  # Allow any clip with at least 1 keyword
)
