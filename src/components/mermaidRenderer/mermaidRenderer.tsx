import React, { useRef } from "react";
import mermaid from "mermaid";
import { useMount, useDebounce } from "react-use";
import mermaidCSS from "./mermaid.css?inline";
import { MermaidBeautifier } from "./MermaidBeautifier";
import useImageDownload from "./hooks/useImageDownload";

interface MermaidRendererProps {
  mermaidString: string;
}

const MermaidRenderer = ({ mermaidString }: MermaidRendererProps) => {
  const rendererDom = useRef<HTMLPreElement>(null);

  const { downloadPNG, downloadSVG, copyPNGToClipboard } = useImageDownload();

  useMount(() => {
    mermaid.initialize({
      theme: "neutral",
      fontFamily: "Pretendard Variable",
      themeCSS: mermaidCSS,
    });
  });

  const beautifySVG = (originSVG: string) => {
    return new MermaidBeautifier(originSVG).exec();
  };

  const renderMermaid = async () => {
    const { svg } = await mermaid.render("mermaidid", mermaidString);
    if (rendererDom.current) rendererDom.current.innerHTML = beautifySVG(svg);
  };

  useDebounce(
    () => {
      renderMermaid();
    },
    300,
    [mermaidString]
  );

  return (
    <>
      <div className="flex flex-row gap-2">
        <button
          className="bg-dark-700 text-dark-200 px-8 py-4 rounded-xl font-bold"
          onClick={() => {
            downloadPNG(rendererDom);
          }}
        >
          Download PNG
        </button>

        <button
          className="bg-dark-700 text-dark-200 px-8 py-4 rounded-xl font-bold"
          onClick={() => {
            downloadSVG(rendererDom);
          }}
        >
          Download SVG
        </button>

        <button
          className="bg-dark-700 text-dark-200 px-8 py-4 rounded-xl font-bold"
          onClick={() => {
            copyPNGToClipboard(rendererDom);
          }}
        >
          Copy PNG to Clipboard
        </button>
      </div>

      <pre
        className="bg-white p-4 rounded-xl"
        style={{
          width: "100%",
        }}
        ref={rendererDom}
      ></pre>
    </>
  );
};

export default MermaidRenderer;
