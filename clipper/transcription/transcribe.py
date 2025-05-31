import whisper
import os

def transcribe_audio(video_path: str, model_size: str = "base") -> list:
    """
    Transcribes the audio from a video or audio file using OpenAI Whisper.

    Args:
        video_path (str): Path to the media file.
        model_size (str): Model to use (tiny, base, small, medium, large).

    Returns:
        List of segments, each with start time, end time, and text.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"File not found: {video_path}")

    model = whisper.load_model(model_size)
    result = model.transcribe(video_path)

    return result.get("segments", [])
