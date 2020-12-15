import { Authorized as AuthorizedRC } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

export function Authorized(roleOrRoles?: any) {
    if (roleOrRoles) {
        roleOrRoles = [roleOrRoles.toString()];
    }
    return function(clsOrObject: Function | Object, method?: string) {
        AuthorizedRC(roleOrRoles)(clsOrObject, method);
        OpenAPI({
            security: [
                {
                    apiKeyAuth: []
                }
            ]
        } as any)(clsOrObject, method);
    };
}