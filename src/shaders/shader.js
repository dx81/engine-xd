export default class Shader {

    static vertex(entity) {
        return entity.renderer.vertexColor;
    }

    static edge() {
        return entity.renderer.edgeColor;
    }

    static face() {
        return entity.renderer.faceColor;
    }
}
