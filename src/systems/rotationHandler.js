import Vector from "../vector.js";
import Matrix from "../matrix.js";

import System from "./system.js";

export default class Rotation extends System {
    
    constructor() {
        super();
    }

    update(list) {
        for (let i = 0; i < list.length; i++) {
            if (!list[i].geometry || !list[i].transform) continue;
            this.rotateEntity(list[i]);
        }
    }

    rotateEntity(entity) {

        let dimensions = entity.geometry.dimensions;
        let rotations = Rotation.axes(dimensions);
        let rotation_matrices = [];

        for (let i = 0; i < rotations.length; i++) {
            rotation_matrices[i] = Rotation.matrix(...rotations[i], dimensions, entity.transform.rotation[i])
        }

        for (let i = 0; i < entity.geometry.vertices.length; i++) {

            let vertex = [ Vector.add(Vector.multiply(entity.geometry.vertices[i], entity.transform.scale), entity.transform.offset) ];

            for (let j = 0; j < rotation_matrices.length; j++) {
                vertex = Matrix.multiply(rotation_matrices[j], vertex);
            }

            entity.geometry.rotated[i] = [ Vector.add(vertex[0], entity.transform.position) ];
        }
    }

    static matrix(axis1, axis2, dimensions, angle) {
        let out = Matrix.identity(dimensions);
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        out[axis1][axis1] =  cos;
        out[axis1][axis2] = -sin;
        out[axis2][axis1] =  sin;
        out[axis2][axis2] =  cos;
        return out;
    }

    static name(index) {
        return String.fromCharCode(88 + (index < 3 ? index : 2 - index));
    }

    static axisCount(dimensions) {
        return dimensions * (dimensions - 1) / 2
    }

    static axes(dimensions) {
        let out = [];
        for (let i = 0; i < dimensions - 1; i++) {
            for (let j = i + 1; j < dimensions; j++) {
                out.push([i, j])
            }
        }
        return out;
    }
}
