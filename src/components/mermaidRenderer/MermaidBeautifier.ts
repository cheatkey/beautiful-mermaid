export class MermaidBeautifier {
  svg: SVGSVGElement;

  constructor(svgString: string) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(svgString, "text/html");
    const svg = doc.body.querySelector("svg");
    if (!svg) throw new Error();
    this.svg = svg;
  }

  private setShadowToRect = () => {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", "moreNaturalShadow");
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");

    const feGaussianBlur = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feGaussianBlur"
    );
    feGaussianBlur.setAttribute("in", "SourceAlpha");
    feGaussianBlur.setAttribute("stdDeviation", "3");

    const feOffset = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feOffset"
    );
    feOffset.setAttribute("dx", "2");
    feOffset.setAttribute("dy", "4");
    feOffset.setAttribute("result", "offsetblur");

    const feFlood = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feFlood"
    );
    feFlood.setAttribute("flood-color", "rgb(149,157,165)");
    feFlood.setAttribute("flood-opacity", "0.15");

    const feComposite = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feComposite"
    );
    feComposite.setAttribute("in2", "offsetblur");
    feComposite.setAttribute("operator", "in");

    const feMerge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feMerge"
    );
    const feMergeNode1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feMergeNode"
    );
    const feMergeNode2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feMergeNode"
    );
    feMergeNode2.setAttribute("in", "SourceGraphic");

    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feOffset);
    filter.appendChild(feFlood);
    filter.appendChild(feComposite);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    this.svg.appendChild(defs);

    // flowchart node
    [...this.svg.querySelectorAll(".basic.label-container")].forEach((rect) => {
      rect.setAttribute("filter", "url(#moreNaturalShadow)");
    });

    // sequenceDiagram node
    [...this.svg.querySelectorAll(".actor.actor-top")].forEach((rect) => {
      rect.setAttribute("filter", "url(#moreNaturalShadow)");
    });
    [...this.svg.querySelectorAll(".actor.actor-bottom")].forEach((rect) => {
      rect.setAttribute("filter", "url(#moreNaturalShadow)");
    });

    // 조건문을 표현하는 마름모
    [...this.svg.querySelectorAll("polygon.label-container")].forEach(
      (rect) => {
        rect.setAttribute("filter", "url(#moreNaturalShadow)");
      }
    );
  };

  private setBorderRadiusToRect = () => {
    [...this.svg.querySelectorAll(".basic.label-container")].forEach((rect) => {
      rect.setAttribute("rx", "10");
      rect.setAttribute("ry", "10");
    });

    // sequenceDiagram node
    [...this.svg.querySelectorAll(".actor.actor-top")].forEach((rect) => {
      rect.setAttribute("rx", "10");
      rect.setAttribute("ry", "10");
    });
    [...this.svg.querySelectorAll(".actor.actor-bottom")].forEach((rect) => {
      rect.setAttribute("rx", "10");
      rect.setAttribute("ry", "10");
    });
    [...this.svg.querySelectorAll(".note")].forEach((rect) => {
      rect.setAttribute("rx", "10");
      rect.setAttribute("ry", "10");
    });
  };

  private removeEmptyEdgeLabel = () => {
    [...this.svg.querySelectorAll(".edgeLabel")].forEach((tag) => {
      if (tag.innerHTML.trim().length === 0) {
        tag.remove();
      }
    });
  };

  private highlighNode = (texts: string[]) => {
    [...this.svg.querySelectorAll(".nodeLabel")].forEach((tag) => {
      const isTarget = texts.some((text) => tag.innerHTML === text);
      if (!isTarget) return;

      if (isTarget) {
        const rectDom = tag.closest("g.node")?.querySelector("rect");
        if (rectDom) {
          rectDom.style.stroke = "#3b82f6";
          rectDom.style.strokeWidth = "2px";
        }

        const polygonDom = tag.closest("g.node")?.querySelector("polygon");
        if (polygonDom) polygonDom.style.stroke = "#3b82f6";
      }
    });
  };

  private setSVGSize = () => {
    this.svg.style.maxWidth = "unset";
  };

  exec = () => {
    this.setShadowToRect();
    this.setBorderRadiusToRect();
    this.removeEmptyEdgeLabel();
    this.highlighNode(["Go shopping", `<i class="fa fa-car"></i> Car`]);
    this.setSVGSize();

    return this.svg.outerHTML;
  };
}
