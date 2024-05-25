// These functions are used to format chat conversations into a structure that can be used as input to the Llama model
// They take a chat history (an array of user and assistant messages) as input and return a formatted prompt.

// Llama 3 template
export const Llama3Template = (defaultSystemPrompt = "") => {
  return function (chat) {
    let systemPrompt = defaultSystemPrompt;

    let parts = [];
    for (let turn of chat) {
      if (turn.role === "system") {
        systemPrompt = turn.content;
        continue;
      }

      if (turn.role === "user") {
        if (systemPrompt !== "") {
          parts.push(
            "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n" +
              systemPrompt +
              "<|eot_id|>" +
              "\n<|start_header_id|>user<|end_header_id|>\n\n" +
              turn.content +
              "<|eot_id|>"
          );
          systemPrompt = "";
        } else {
          parts.push(
            "<|start_header_id|>user<|end_header_id|> " +
              turn.content +
              "<|eot_id|>"
          );
        }
      }

      if (turn.role === "assistant") {
        parts.push(
          "<|start_header_id|>assistant<|end_header_id|>" +
            turn.content +
            "<|eot_id|>"
        );
      }
    }

    return parts.join("");
  };
};

// Llama template
export const LlamaTemplate = (defaultSystemPrompt = "") => {
  return function (chat) {
    let systemPrompt = defaultSystemPrompt;

    let parts = [];
    for (let turn of chat) {
      if (turn.role === "system") {
        systemPrompt = turn.content;
        continue;
      }

      if (turn.role === "user") {
        if (systemPrompt !== "") {
          parts.push(
            "<s>[INST] <<SYS>>\n" +
              systemPrompt +
              "\n<</SYS>>\n\n" +
              turn.content +
              " [/INST]"
          );
          systemPrompt = "";
        } else {
          parts.push("<s>[INST] " + turn.content + " [/INST]");
        }
      }

      if (turn.role === "assistant") {
        parts.push(" " + turn.content + " </s>");
      }
    }

    return parts.join("");
  };
};
