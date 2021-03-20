import System from "./system.js";

export default class ShaderHandler extends System {

    constructor(engine) {
        super();
        this.engine = engine;
        this.shaders = {};
    }

    static shaderTypes = [ "vertex", "edge", "face" ];

    async add(entity) {
        if (!entity.shaders) return;
        await this.register(entity.shaders);
    }

    async register(shaders) {
        for (let i = 0; i < this.constructor.shaderTypes.length; i++) {
            this.shaders[shaders[this.constructor.shaderTypes[i]].name] =
                (await import(`../shaders/${shaders[this.constructor.shaderTypes[i]].name}.js`)).default;
        }
    }
}
