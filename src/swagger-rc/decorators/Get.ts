import { BaseRoutingControllerExt } from "../BaseRoutingController";
import { DocumentationOptions } from "../DocumentationOptions";
import { Get as GetRC } from "routing-controllers";

export function Get(route?: string, options?: DocumentationOptions): Function {
    return function(object: Object, methodName: string) {
        GetRC(route)(object, methodName);
        BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
