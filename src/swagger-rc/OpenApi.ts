import { OpenAPI as OpenAPIRC, OpenAPIParam } from "routing-controllers-openapi";

export function OpenAPI(spec: OpenAPIParam): Function {
    return function(target: object, key: string) {
        OpenAPIRC([spec])(target, key);
    };
}
