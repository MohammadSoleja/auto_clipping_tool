import os
import subprocess

def clip_video(input_path: str,
               segments: list,
               output_dir: str = "output",
               min_duration: float = 3.0,
               max_duration: float = 30.0,
               keywords: list = None):
    """
    Clips the video based on start and end times of segments,
    filtering by duration and optionally by keyword match.

    Args:
        input_path (str): Path to the original video file.
        segments (list): List of dicts with 'start', 'end', and 'text'.
        output_dir (str): Folder for saving clips.
        min_duration (float): Minimum length of a clip in seconds.
        max_duration (float): Maximum length of a clip in seconds.
        keywords (list): List of keywords to match in text (optional).
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    clip_count = 0
    for idx, seg in enumerate(segments):
        start = seg['start']
        end = seg['end']
        duration = end - start

        # Skip clips outside the allowed duration range
        if duration < min_duration or duration > max_duration:
            continue

        # If keyword filtering is enabled
        if keywords:
            text = seg.get('text', '').lower()
            if not any(kw.lower() in text for kw in keywords):
                continue

        clip_count += 1
        output_path = os.path.join(output_dir, f"clip_{clip_count}.mp4")

        cmd = [
            "ffmpeg", "-y",
            "-ss", str(start),
            "-i", input_path,
            "-t", str(duration),
            "-c", "copy",
            output_path
        ]

        print(f"Saved clip {clip_count}: [{start:.2f}s - {end:.2f}s], {duration:.2f}s")
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
