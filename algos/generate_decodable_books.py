import os
from openai import OpenAI
from guardrails import Guard
from guardrails.hub import (
    ToxicLanguage,
    ProfanityFree,
    ReadingTime,
    PolitenessCheck,
    SensitiveTopic,
    ValidLength,
    ReadingLevel,
    NSFWText
)

import sys
import json


os.environ["OPENAI_API_KEY"] = "INSERT"
client = OpenAI()

def generate_decodable_books(words):
    prompt = f"For each of the following words: {', '.join(words)}, generate a decodable book consisting of EXACTLY three sentences that use the word in a meaningful context suitable for dyslexic children. Do not include any other text or explanations, only the three sentences for each word. Recall that these are children's books, so make the sentences relatively simple with a maximum of six words per sentence."

    guard = Guard().use_many(
        ProfanityFree(),
    )

    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=300,
        n=1,
        stop=None,
        temperature=0.7,
    )

    generated_text = response.choices[0].text.strip()
    
    # Validate the generated text using the guardrails
    validation_outcome = guard.validate(generated_text)
    validated_text = validation_outcome.validated_output

    books = []
    for word, book_text in zip(words, validated_text.split("\n\n")):
        sentences = book_text.strip().split("\n")
        book = {"word": word, "sentences": sentences}
        books.append(book)

    print(json.dumps(books, indent=2))

if __name__ == "__main__":
    words = ["pure", "mature", "ensure", "procedure"]
    generate_decodable_books(words)