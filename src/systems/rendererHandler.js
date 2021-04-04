import System from "./system.js";

export default class RendererHandler extends System {
    constructor(engine, displays) {
        super();
        this.engine = engine;
        this.displays = displays;
    }

    renderCamera(camera, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].renderer && list[i].transform) {
                this.renderEntity(list[i], i, camera);
            }
        }
    }

    renderEntity(entity, id, camera) {
        if (!entity.renderer.render) return;

        this.engine.projectionHandler.projectEntity(entity, camera);

        for (let i = 0; i < camera.camera.displays.length; i++) {
            this.renderFaces(entity, id, this.engine.displays[camera.camera.displays[i].index]);
            this.renderEdges(entity, id, this.engine.displays[camera.camera.displays[i].index]);
            this.renderVertices(entity, id, this.engine.displays[camera.camera.displays[i].index]);
        }
    }

    renderVertices(entity, entity_id, display) {
        if (!entity.renderer.renderVertices) return;
        for (let i = 0; i < entity.geometry.projected.length; i++) {
            let color = this.engine.shaderHandler.shaders[entity.shaders.vertex.name].vertex.apply(entity, [ entity.shaders.vertex.args, this.engine, entity_id, i ]); 
            display.circle(entity.geometry.projected[i], 1, color, "fill");
            this.engine.frame_draws++;
        }
    }

    renderEdges(entity, entity_id, display) {
        if (!entity.renderer.renderEdges) return;
        for (let i = 0; i < entity.geometry.edges.length; i++) {
            let a = entity.geometry.projected[entity.geometry.edges[i][0]];
            let b = entity.geometry.projected[entity.geometry.edges[i][1]];
            let color = this.engine.shaderHandler.shaders[entity.shaders.edge.name].edge.apply(entity, [ entity.shaders.edge.args, this.engine, entity_id, i ]); 
            display.line(a, b, color);
            this.engine.frame_draws++;
        }
    }

    renderFaces(entity, entity_id, display) {
        if (!entity.renderer.renderFaces) return;
        for (let i = 0; i < entity.geometry.faces.length; i++) {
            let vertices = [];
            for (let j = 0; j < entity.geometry.faces[i].length; j++) {
                vertices[j] = entity.geometry.projected[entity.geometry.faces[i][j]];
            }
            let color = this.engine.shaderHandler.shaders[entity.shaders.face.name].face.apply(entity, [ entity.shaders.face.args, this.engine, entity_id, i ]); 
            display.polygon(vertices, color);
            this.engine.frame_draws++;
        }
    }
}
