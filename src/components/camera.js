export default class Camera {

    static get default() {
        return {
            active: true,
            distance: 1,
            isometric: true,
            displays: [ { index: 0, clear: true, color: "#000000" } ],
            scale: 1,
        };
    }

    constructor(camera) {
        return { ...Camera.default, ...camera };
    }
}
