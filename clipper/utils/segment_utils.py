import re

def split_segments_by_sentence(segments, min_duration=5.0, max_duration=30.0):
    grouped = []
    current_group = []
    group_start = None
    group_end = None

    for seg in segments:
        text = seg["text"]
        start = seg["start"]
        end = seg["end"]
        keywords = seg.get("keywords", [])

        # Split text on sentence-ending punctuation
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())
        current_start = start
        sentence_duration = (end - start) / max(len(sentences), 1)

        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue

            sentence_end = current_start + sentence_duration

            # Preserve keywords in each sentence-split
            current_group.append({
                "text": sentence,
                "start": current_start,
                "end": sentence_end,
                "keywords": keywords  # carry over original segment's keywords
            })

            group_start = current_group[0]["start"]
            group_end = sentence_end
            total_duration = group_end - group_start

            if total_duration >= min_duration:
                if total_duration >= max_duration:
                    grouped.append(current_group)
                    current_group = []

            current_start = sentence_end

    if current_group:
        grouped.append(current_group)

    return grouped
