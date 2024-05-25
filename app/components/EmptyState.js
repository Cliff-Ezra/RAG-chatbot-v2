export default function EmptyState({ setOpen, setPrompt }) {
  return (
    <div className="flex gap-x-4 mb-8">
      <span className="text-xl sm:text-2xl pt-4" title="AI">
        👨🏽‍⚖️
      </span>
      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1 rounded-lg bg-gray-100 py-5 px-5">
        <p>I&apos;m an law-based chatbot.</p>
        <p>
          I can{" "}
          <button
            className="prompt-button"
            onClick={() =>
              setPrompt(
                "Explain the 2024 Kenya Financial Act and how it affects the average citizen."
              )
            }
          >
            explain recent legislation
          </button>
          , and summarize{" "}
          <button
            className="prompt-button"
            onClick={() =>
              setPrompt(
                "Tell me how many legislations have been released in Kenya in 2024. "
              )
            }
          >
            legislation.
          </button>{" "}
        </p>
        <p>What do you want to chat about today?</p>
      </div>
    </div>
  );
}
