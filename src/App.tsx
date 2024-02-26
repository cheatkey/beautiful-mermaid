import { useState } from "react";
import MermaidRenderer from "./components/mermaidRenderer/mermaidRenderer";
import TextareaAutosize from "react-textarea-autosize";
import GithubCorner from "./components/GithubCorner/GithubCorner";

const App = () => {
  const [mermaidString, setMermaidString] = useState(
    `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]`
  );

  return (
    <>
      <GithubCorner />
      <div className="w-full min-h-screen bg-gray-100 flex justify-center">
        <main className="px-8 py-16 flex flex-col gap-6 w-full max-w-[1200px]">
          <h1
            className="text-transparent bg-clip-text text-5xl font-extrabold w-fit"
            style={{
              backgroundImage: `linear-gradient(90deg,#0093E9,#80D0C7)`,
            }}
          >
            Beautiful Mermaid
          </h1>

          <TextareaAutosize
            className="bg-dark-700 text-dark-200 p-4 rounded-xl leading-6"
            value={mermaidString}
            onChange={(e) => setMermaidString(e.target.value)}
          />

          <MermaidRenderer mermaidString={mermaidString} />
        </main>
      </div>
    </>
  );
};

export default App;
