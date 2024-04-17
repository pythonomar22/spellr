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

def find_phonetically_similar_words(target_word, word_list, threshold=0.1, top_n=None):
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

def find_common_phonetic_patterns(target_words, word_list, threshold=0.8):
    phonetic_codes = [doublemetaphone(word)[0] for word in target_words]
    phonetic_code_counter = Counter(phonetic_codes)
    common_patterns = [code for code, count in phonetic_code_counter.items() if count >= threshold * len(target_words)]
    return common_patterns

def recommend_words(target_words, word_list, top_n=None):
    recommended_words = []
    common_patterns = find_common_phonetic_patterns(target_words, word_list)

    for target_word in target_words:
        similar_words = find_phonetically_similar_words(target_word, word_list)
        for word, score in similar_words:
            phonetic_code = doublemetaphone(word)[0]
            if phonetic_code in common_patterns:
                recommended_words.append((word, score))

    recommended_words.sort(key=lambda x: x[1], reverse=True)
    if top_n:
        recommended_words = recommended_words[:top_n]
    return recommended_words

def main(target_words, top_n=None):
    # Replace with the path to your word list file
    file_path = '/home/omar/Downloads/words.txt'
    word_list = parse_words_from_file(file_path)
    recommended_words = recommend_words(target_words, word_list, top_n)
    return recommended_words

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide target words as arguments.")
    else:
        target_words = sys.argv[1:]
        top_n = 10  # You can adjust this value as needed
        recommended_words = main(target_words, top_n)
        print(recommended_words)