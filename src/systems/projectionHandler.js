import System from "./system.js";
import Vector from "../vector.js";
import Matrix from "../matrix.js";

export default class ProjectionHandler extends System {

    projectEntity(entity, camera) {

        for (let i = 0; i < entity.geometry.points.length; i++) {
            entity.geometry.points[i] =
                [ Vector.add(Vector.add(Vector.multiply(entity.geometry.points[i], entity.transform.scale), entity.transform.offset), entity.transform.position) ];
        }

        for (let i = 0; i < entity.geometry.points.length; i++) {

            for (let d = entity.geometry.dimensions; d > 2; d--) {
                let w;
                if (camera.camera.isometric) {
                    w =  1;
                }
                else {
                    w = camera.camera.distance / (camera.camera.distance - entity.geometry.points[i][0][d - 1]);
                }
                entity.geometry.points[i] = Matrix.multiply(ProjectionHandler.matrix(d, w), entity.geometry.points[i]);
            }
            entity.geometry.points[i] = Vector.scalar(entity.geometry.points[i][0], camera.camera.isometric ? camera.camera.scale : camera.camera.scale);
        }
    }

    static matrix(dimensions, scale) {
        return Matrix.identity(dimensions, scale);
    }
}
