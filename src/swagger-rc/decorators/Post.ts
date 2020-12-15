import { BaseRoutingControllerExt } from "../BaseRoutingController";
import { DocumentationOptions } from "../DocumentationOptions";
import { Post as PostRC } from "routing-controllers";

export function Post(route?: string, options?: DocumentationOptions): Function {
    return function(object: Object, methodName: string) {
        PostRC(route)(object, methodName);
        BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
