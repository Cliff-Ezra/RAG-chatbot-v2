import React from "react";
import { notableLegislations, sampleQuestions } from "../data/questions";

export default function EmptyState({ setOpen, setPrompt }) {
  const [showQuestions, setShowQuestions] = React.useState(false);

  return (
    <div className="flex gap-x-4 mb-8">
      <span className="text-xl sm:text-2xl pt-4" title="AI">
        🤖
      </span>
      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1 rounded-lg bg-gray-100 py-5 px-5">
        <p>
          I&apos;m a law-based chatbot specializing in recent Kenyan legislation from
          2022 to 2024. I can help you understand and navigate the key
          provisions, objectives, and impact of various acts passed during this
          period.
        </p>
        <p>Some of the notable legislations I can assist you with include:</p>
        <ol className="list-decimal pl-6">
          {notableLegislations.map((legislation, index) => (
            <li key={index}>
              <button
                className="text-black underline"
                onClick={() =>
                  setPrompt(`What are the key provisions of ${legislation}?`)
                }
              >
                {legislation}
              </button>
            </li>
          ))}
        </ol>
        <p>
          Feel free to ask me about any specific legislation or select from the
          sample questions below.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded self-start"
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {showQuestions ? "Hide Sample Questions" : "Show Sample Questions"}
        </button>
        {showQuestions && (
          <ul className="list-disc pl-6 mt-2 text-left">
            {sampleQuestions.map((question, index) => (
              <li key={index}>
                <button
                  className="text-black underline"
                  onClick={() => setPrompt(question)}
                >
                  {question}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
