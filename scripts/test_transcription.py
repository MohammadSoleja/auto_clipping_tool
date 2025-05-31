import sys
import os

# Add project path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from clipper.transcription.transcribe import transcribe_audio
from clipper.clipping.clip import clip_video

video_path = ("input/video_clip_long.mp4")
segments = transcribe_audio(video_path)

# Print transcription
for seg in segments:
    print(f"[{seg['start']:.2f}s - {seg['end']:.2f}s]: {seg['text']}")

# Clip video
clip_video(
    video_path,
    segments,
    min_duration=5.0,
    max_duration=25.0,
    keywords=["immigration", "officer", "diver", "fantasy", "tom", "daily", "architect", "dream", "childhood"]
)


