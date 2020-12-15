import { Put as PutRC } from "routing-controllers";
import { BaseRoutingControllerExt } from "../BaseRoutingController";
import { DocumentationOptions } from "../DocumentationOptions";

export function Put(route?: string, options?: DocumentationOptions): Function {
    return function(object: Object, methodName: string) {
        PutRC(route)(object, methodName);
        BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
