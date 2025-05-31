from keybert import KeyBERT

model = KeyBERT(model='all-MiniLM-L6-v2')

def extract_keywords_from_segment(text, top_n=3):
    if not text.strip():
        return []
    keywords = model.extract_keywords(text, top_n=top_n, stop_words='english')
    return [kw for kw, score in keywords if kw]
