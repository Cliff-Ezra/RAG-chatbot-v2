from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
from model import run_llama

app = Flask(__name__)
CORS(app)

@app.route("/api/generate", methods=["POST"])
def llama_handler():
    print("Received request")
    data = request.get_json()
    print(f"Request data: {data}")
    model = data.get("model")
    prompt = data.get("prompt")
    system_prompt = data.get("systemPrompt")
    max_tokens = data.get("maxTokens")
    temperature = data.get("temperature")
    top_p = data.get("topP")
    try:
        response = run_llama(model, prompt, system_prompt, max_tokens, temperature, top_p)
    except Exception as e:
        print(f"Error running Llama: {e}")
        return str(e), 500

    def stream():
        for chunk in response:
            yield chunk

    return Response(stream_with_context(stream()), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5328)