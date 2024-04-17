from metaphone import doublemetaphone
from collections import Counter
import sys

def parse_words_from_file(file_path):
    words = []
    with open(file_path, 'r') as file:
        for line in file:
            word = line.strip()
            if word:
                words.append(word)
    return words

def find_phonetically_similar_words(target_word, word_list, threshold=0.6, top_n=None):
    phonetic_target = doublemetaphone(target_word)[0]  # Use the primary code
    similar_words = []
    for word in word_list:
        phonetic_word = doublemetaphone(word)[0]  # Use the primary code
        if phonetic_word and phonetic_target:
            similarity_score = calculate_similarity(phonetic_target, phonetic_word)
            if similarity_score >= threshold:
                similar_words.append((word, similarity_score))
    similar_words.sort(key=lambda x: x[1], reverse=True)
    if top_n:
        similar_words = similar_words[:top_n]
    return similar_words

def calculate_similarity(code1, code2):
    """ Calculate the Jaccard similarity between two Double Metaphone codes. """
    code1_counter = Counter(code1)
    code2_counter = Counter(code2)
    intersection = sum((code1_counter & code2_counter).values())
    union = sum((code1_counter | code2_counter).values())
    if union == 0:
        return 0
    else:
        return intersection / union

def main(target_word, top_n=None):
    # Replace with the path to your word list file
    file_path = '/home/omar/Downloads/words.txt'
    word_list = parse_words_from_file(file_path)
    similar_words = find_phonetically_similar_words(target_word, word_list, threshold=0.95, top_n=top_n)
    return similar_words

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide a target word as an argument.")
    else:
        target_word = sys.argv[1]
        top_n = int(sys.argv[2]) if len(sys.argv) > 2 else None
        similar_words = main(target_word, top_n)
        print(similar_words)