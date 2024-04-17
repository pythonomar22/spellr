from metaphone import doublemetaphone
from collections import Counter

def parse_words_from_file(file_path):
    words = []
    with open(file_path, 'r') as file:
        for line in file:
            word = line.strip()
            if word:
                words.append(word)
    return words

def find_phonetically_similar_words(target_word, word_list, threshold=0.6):
    phonetic_target = doublemetaphone(target_word)[0]  # Use the primary code
    similar_words = []

    for word in word_list:
        phonetic_word = doublemetaphone(word)[0]  # Use the primary code
        if phonetic_word and phonetic_target:
            similarity_score = calculate_similarity(phonetic_target, phonetic_word)
            if similarity_score >= threshold:
                similar_words.append((word, similarity_score))

    similar_words.sort(key=lambda x: x[1], reverse=True)
    return similar_words

def calculate_similarity(code1, code2):
    """
    Calculate the Jaccard similarity between two Double Metaphone codes.
    """
    code1_counter = Counter(code1)
    code2_counter = Counter(code2)
    
    intersection = sum((code1_counter & code2_counter).values())
    union = sum((code1_counter | code2_counter).values())
    
    if union == 0:
        return 0
    else:
        return intersection / union

# Example usage
file_path = '/home/omar/Downloads/words.txt'
word_list = parse_words_from_file(file_path)

target_word = "adventure"
similar_words = find_phonetically_similar_words(target_word, word_list, 0.95)
print(similar_words)