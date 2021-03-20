import Components from "./components/components.js";
import { uncap } from "./utils.js";

export default class Entity {

    constructor(entity) {
        
        this.id = entity.id;
        for (let component in Components) {
            if (!entity[uncap(component)]) continue;
            this[uncap(component)] = new Components[component](entity[uncap(component)], entity);
        }
    }
}
