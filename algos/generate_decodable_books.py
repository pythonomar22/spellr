from openai import OpenAI
client = OpenAI(api_key="sk-proj-YczTuuw7WXlkC8U7EtRJT3BlbkFJ6xe7HyyF8loAb4KebTZJ")
import sys
import json

def generate_decodable_books(words):
    prompt = f"For each of the following words: {', '.join(words)}, generate a decodable book consisting of EXACTLY three sentences that use the word in a meaningful context suitable for dyslexic children. Do not include any other text or explanations, only the three sentences for each word. Recall that these are children's books, so make the sentences relatively simple with a maximum of six words per sentence."

    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=300,
        n=1,
        stop=None,
        temperature=0.7,
    )

    generated_text = response.choices[0].text.strip()
    books = [{"word": word, "sentences": book.split("\n")} for word, book in zip(words, generated_text.split("\n\n"))]

    print(json.dumps(books, indent=2))

if __name__ == "__main__":
    words = ["pure", "mature", "ensure", "procedure"]
    generate_decodable_books(words)