import Display from "./display.js";
import Vector from "../vector.js";

export default class Canvas extends Display {
    constructor(id, scale = [ 1, 1 ], offset = [ 0, 0 ], bgColor = "#000000", fgColor = "#FFFFFF") {
        super();
        this.canvas = document.querySelector(`#${id}`);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 1;
        this.scale = scale;
        this.offset = offset;
        this.bgColor = bgColor;
        this.fgColor = fgColor;

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.clear();
    }

    static Style = {
        fill: "fillStyle",
        stroke: "strokeStyle"
    }

    resize() {
        this.ctx.resetTransform();
        this.ctx.translate(...Vector.scalar([ this.canvas.width - this.offset[0], this.canvas.height - this.offset[1] ], 1/2));
        this.ctx.scale(...this.scale);
        return this;
    }

    clear(color = this.bgColor) {
        let w = this.canvas.width;
        let h = this.canvas.height;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(-w, -h, 2 * w, 2 * h);
        return this;
    }

    rectangle(pos, size, color = this.fgColor, method = "fill") {
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.rect(pos[0], pos[1], size[0], size[1]);
        this.ctx[method]();
        return this;
    }

    circle(pos, r = 1, color = this.fgColor, method = "fill") {
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI);
        this.ctx[method]();
        return this;
    }

    line(pos1, pos2, color = this.fgColor) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(pos1[0], pos1[1]);
        this.ctx.lineTo(pos2[0], pos2[1]);
        this.ctx.stroke();
        return this;
    }

    polygon(vertices, color = this.fgColor, method = "fill") {
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.moveTo(vertices[0][0], vertices[0][1]);
        for (let i = 1; i < vertices.length; i++) {
            this.ctx.lineTo(vertices[i][0], vertices[i][1]);
        }
        this.ctx[method]();
        return this;
    }
}
