export default class Renderer {

    static get default() {
        return {
            vertexColor: "#FFFFFF",
            edgeColor: "#FFFFFF",
            faceColor: "#FFFFFF",
            render: true,
            renderVertices: true,
            renderEdges: true,
            renderFaces: true,
        };
    }

    constructor(renderer) {
        return  { ...Renderer.default, ...renderer };
    }
}
