import nltk
from nltk.corpus import cmudict
from nltk.metrics.distance import edit_distance
import sys

# Download the CMU Pronouncing Dictionary
nltk.download('cmudict')

# Load the pronunciation dictionary
pron_dict = cmudict.dict()

def parse_words_from_file(file_path):
    words = []
    with open(file_path, 'r') as file:
        for line in file:
            word = line.strip()
            if word:
                words.append(word)
    return words

def get_pronunciation(word):
    if word.lower() in pron_dict:
        return pron_dict[word.lower()][0]
    else:
        return None

def phonetic_similarity(word1, word2):
    pron1 = get_pronunciation(word1)
    #print(pron1)
    pron2 = get_pronunciation(word2)
    #print(pron2)
    
    if pron1 and pron2:
        distance = edit_distance(pron1, pron2)
        max_length = max(len(pron1), len(pron2))
        similarity = 1 - (distance / max_length)
        return similarity
    else:
        return 0

def find_phonetically_similar_words(target_words, word_list, threshold=0.6, top_n=None):
    similar_words = []
    
    for target_word in target_words:
        for word in word_list:
            if not any(word.startswith(tw) for tw in target_words):
                similarity = phonetic_similarity(target_word, word)
                if similarity >= threshold:
                    similar_words.append((word, similarity))
    
    similar_words.sort(key=lambda x: x[1], reverse=True)
    if top_n:
        similar_words = similar_words[:top_n]
    
    return similar_words

def main(target_words, top_n=None):
    # Replace with the path to your word list file
    file_path = '/home/omar/Downloads/words.txt'
    word_list = parse_words_from_file(file_path)
    similar_words = find_phonetically_similar_words(target_words, word_list, threshold=0.6, top_n=top_n)
    return similar_words

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide target words as command line arguments.")
    else:
        target_words = sys.argv[1:]
        top_n = 10  # You can adjust this value as needed
        similar_words = main(target_words, top_n)
        print(similar_words)