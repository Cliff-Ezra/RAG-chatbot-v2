import os
from replicate import Client as Replicate

print(f"REPLICATE_API_TOKEN: {os.environ.get('REPLICATE_API_TOKEN')}")

replicate = Replicate(os.environ.get("REPLICATE_API_TOKEN"))

def run_llama(model, prompt, system_prompt, max_tokens, temperature, top_p):
    print("Running Llama")
    print(f"Model: {model}")
    print(f"Max Tokens: {max_tokens}")

    try:
        response = replicate.predictions.create(
            model=model,
            stream=True,
            input={
                "prompt": prompt,
                "max_new_tokens": max_tokens,
                **({"max_tokens": max_tokens} if "llama3" in model else {"max_new_tokens": max_tokens}),
                "temperature": temperature,
                "repetition_penalty": 1,
                "top_p": top_p,
            },
        )

        def generator():
            for chunk in response:
                yield chunk[0]

        return generator()
    except Exception as e:
        print(f"Error running Llama: {e}")
        raise e