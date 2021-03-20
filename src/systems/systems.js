import ScriptHandler from "./scriptHandler.js";
import ShaderHandler from "./shaderHandler.js";
import RotationHandler from "./rotationHandler.js";
import ProjectionHandler from "./projectionHandler.js";
import RendererHandler from "./rendererHandler.js";
import CameraHandler from "./cameraHandler.js";

export default class Systems {
    static ScriptHandler = ScriptHandler;
    static ShaderHandler = ShaderHandler;
    static RotationHandler = RotationHandler;
    static ProjectionHandler = ProjectionHandler;
    static RendererHandler = RendererHandler;
    static CameraHandler = CameraHandler;
}
