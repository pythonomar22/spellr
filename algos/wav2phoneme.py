from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torch
import soundfile as sf
import librosa

# Load model and processor
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-lv-60-espeak-cv-ft")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-lv-60-espeak-cv-ft")

def transcribe_audio(audio_file):
    # Read the input audio file
    audio_input, sample_rate = librosa.load(audio_file, sr=16000)
    
    # Process the audio
    inputs = processor(audio_input, sampling_rate=sample_rate, return_tensors="pt", padding=True)

    # Generate predictions
    with torch.no_grad():
        logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits

    # Decode predicted phoneme ids into strings
    predicted_ids = torch.argmax(logits, axis=-1)      
    predicted_sentences = processor.batch_decode(predicted_ids)
    
    return predicted_sentences

if __name__ == "__main__":
    # Replace "your_audio_file.mp3" with the path to your MP3 file
    audio_file = "/home/omar/Downloads/testthis.mp3"
    
    # Transcribe the audio file
    phonemes = transcribe_audio(audio_file)
    
    # Output the phonemes
    print("Phonemes:", phonemes)
