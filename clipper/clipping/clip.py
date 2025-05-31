import os
import subprocess

def clip_video(input_path: str,
               segments: list,
               output_dir: str = "output",
               min_duration: float = 3.0,
               max_duration: float = 30.0,
               keyword_threshold: int = 1,
               max_gap: float = 1.5):
    """
    Clips the video based on merged transcript segments,
    filtering by segment-level extracted keywords and duration.

    Args:
        input_path (str): Path to the original video file.
        segments (list): List of dicts with 'start', 'end', 'text', 'keywords'.
        output_dir (str): Folder for saving clips.
        min_duration (float): Minimum length of a clip in seconds.
        max_duration (float): Maximum length of a clip in seconds.
        keyword_threshold (int): Minimum number of keywords in a group to keep the clip.
        max_gap (float): Max gap allowed between segments to merge.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    clip_count = 0
    current_group = []
    group_start = None
    group_end = None
    group_text = ""
    group_keywords = []

    def flush_group():
        nonlocal clip_count, group_start, group_end, group_text, group_keywords
        duration = group_end - group_start if group_start is not None and group_end is not None else 0
        if duration < min_duration or duration > max_duration:
            return

        # Deduplicate and check keyword count
        unique_keywords = list(set(k.lower() for k in group_keywords if isinstance(k, str)))

        if len(unique_keywords) < keyword_threshold:
            return

        clip_count += 1
        output_path = os.path.join(output_dir, f"clip_{clip_count}.mp4")

        cmd = [
            "ffmpeg", "-y",
            "-ss", str(group_start),
            "-i", input_path,
            "-t", str(duration),
            "-c", "copy",
            output_path
        ]

        print(f"Saved clip {clip_count}: [{group_start:.2f}s - {group_end:.2f}s], {duration:.2f}s")
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

    for seg in segments:
        start = seg['start']
        end = seg['end']
        text = seg['text']
        keywords = seg.get('keywords', [])

        if not current_group:
            # Start new group
            group_start = start
            group_end = end
            group_text = text
            group_keywords = keywords.copy()
            current_group = [seg]
        else:
            gap = start - group_end
            if gap <= max_gap and (end - group_start) <= max_duration:
                # Merge into current group
                group_end = end
                group_text += " " + text
                group_keywords.extend(keywords)
                current_group.append(seg)
            else:
                # Flush and start a new group
                flush_group()
                group_start = start
                group_end = end
                group_text = text
                group_keywords = keywords.copy()
                current_group = [seg]

    # Flush final group
    flush_group()
