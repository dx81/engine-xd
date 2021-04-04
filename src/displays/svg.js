import Display from "./display.js";

export default class SVG extends Display {
    constructor(id, scale = [ 1, 1 ], offset = [ 0, 0 ], bgColor = "#000000", fgColor = "#FFFFFF") {
        super();
        this.svg = document.querySelector(`#${id}`);
        this.scale = scale;
        this.offset = offset;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.svgns = "http://www.w3.org/2000/svg";
        this.svg.setAttribute("viewBox", "-600 -300 1200 600");
        this.clear();
    }

    clear(color = this.bgColor) {
        console.log(this.svg)
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.lastChild);
        }
        this.svg.style.backgroundColor = color;
        return this;
    }

    rectangle(pos, size, color = this.fgColor, method = "fill") {
        let rect = document.createElementNS(this.svgns, "rect");
        rect.setAttribute("x", pos[0]);
        rect.setAttribute("y", pos[1]);
        rect.setAttribute("width", size[0]);
        rect.setAttribute("height", size[1]);
        rect.setAttribute(method, color);
        this.svg.appendChild(rect);
        return this;
    }

    circle(pos, r = 1, color = this.fgColor, method = "fill") {
        let circle = document.createElementNS(this.svgns, "circle");
        circle.setAttribute("cx", pos[0]);
        circle.setAttribute("cy", pos[1]);
        circle.setAttribute("r", r);
        circle.setAttribute(method, color);
        this.svg.appendChild(circle);
        return this;
    }

    line(pos1, pos2, color = this.fgColor) {
        let line = document.createElementNS(this.svgns, "line");
        line.setAttribute("x1", pos1[0]);
        line.setAttribute("y1", pos1[1]);
        line.setAttribute("x2", pos2[0]);
        line.setAttribute("y2", pos2[1]);
        line.setAttribute("stroke", color);
        this.svg.appendChild(line);
        return this;
    }

    polygon(vertices, color = this.fgColor, method = "fill") {
        let polygon = document.createElementNS(this.svgns, "polygon");
        let points = "";
        for (let i = 1; i < vertices.length; i++) {
            points += `${vertices[i][0]},${vertices[i][1]} `
        }
        points += `${vertices[0][0]},${vertices[0][1]} `
        polygon.setAttribute("points", points);
        polygon.setAttribute(method, color);
        this.svg.appendChild(polygon);
        return this;
    }
}
