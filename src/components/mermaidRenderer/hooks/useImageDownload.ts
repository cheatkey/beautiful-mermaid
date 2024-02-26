import html2canvas from "html2canvas";

const useImageDownload = () => {
  const downloadPNG = async (rendererDom: React.RefObject<HTMLPreElement>) => {
    if (!rendererDom.current) throw new Error();

    const canvas = await html2canvas(rendererDom.current);

    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "downloaded_image.png";
    link.href = img;
    link.click();
  };

  const downloadSVG = (rendererDom: React.RefObject<HTMLPreElement>) => {
    const svgElement = rendererDom.current?.querySelector("svg");
    if (!svgElement) return;
    const svgString = new XMLSerializer().serializeToString(svgElement);

    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "mySvg.svg";
    downloadLink.click();
  };

  const copyPNGToClipboard = async (
    rendererDom: React.RefObject<HTMLPreElement>
  ) => {
    try {
      if (!rendererDom.current) throw new Error();

      const canvas = await html2canvas(rendererDom.current);

      canvas.toBlob(async function (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob as Blob,
            }),
          ]);
          alert("The image has been copied to the clipboard.");
        } catch (err) {
          alert("Failed to copy to clipboard");
        }
      }, "image/png");
    } catch (err) {
      alert("Capture failed");
    }
  };

  return {
    downloadPNG,
    downloadSVG,
    copyPNGToClipboard,
  };
};

export default useImageDownload;
