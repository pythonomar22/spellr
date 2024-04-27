import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load the GPT-2 model and tokenizer
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Set the model to evaluation mode
model.eval()

# Interactive loop
while True:
    # Get user input
    user_input = input("You: ")

    # Tokenize the input
    input_ids = tokenizer.encode(user_input, return_tensors="pt")

    # Generate a response
    with torch.no_grad():
        output = model.generate(input_ids, max_length=100, num_return_sequences=1)

    # Decode and print the generated response
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    print("GPT-2:", response)