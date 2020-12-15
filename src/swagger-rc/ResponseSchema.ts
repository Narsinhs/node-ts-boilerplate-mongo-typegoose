import { ResponseOptions } from "./DocumentationOptions";
import { ResponseSchema as ResponseSchemaRC } from "routing-controllers-openapi";

export function ResponseSchema(options: ResponseOptions) {
    return function(object: Object, methodName: string) {
        ResponseSchemaRC(options.model, {
            description: options.description,
            isArray: options.isArray,
            statusCode: options.code || "200",
            contentType: "application/json"
        })(object, methodName);
    };
}
