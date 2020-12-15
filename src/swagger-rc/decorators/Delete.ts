import { Delete as DeleteRC } from "routing-controllers";
import { BaseRoutingControllerExt } from "../BaseRoutingController";
import { DocumentationOptions } from "../DocumentationOptions";

export function Delete(route?: string, options?: DocumentationOptions): Function {
    return function(object: Object, methodName: string) {
        DeleteRC(route)(object, methodName);
        BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
