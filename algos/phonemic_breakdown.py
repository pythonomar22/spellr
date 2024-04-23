import nltk
from nltk.corpus import cmudict
import sys

# Download the CMU Pronouncing Dictionary
nltk.download('cmudict')

# Load the pronunciation dictionary
pron_dict = cmudict.dict()

def get_phonemic_breakdown(word):
    if word.lower() in pron_dict:
        phonemes = pron_dict[word.lower()][0]
        return ' '.join(phonemes)
    else:
        return ''

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide a word as a command line argument.")
    else:
        word = sys.argv[1]
        phonemic_breakdown = get_phonemic_breakdown(word)
        print(phonemic_breakdown)