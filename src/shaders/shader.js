export default class Shader {

    static vertex(entity) {
        return entity.renderer.vertexColor;
    }

    static edge(entity) {
        return entity.renderer.edgeColor;
    }

    static face(entity) {
        return entity.renderer.faceColor;
    }
}
