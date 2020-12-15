import { QueryParam as QueryParamRC } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { GetOpenAPISSMetaData, SetOpenAPISSMetaData } from "../../helpers/OpenAPIHelper";

export function QueryParam(key): Function {
    return function(object: Object, methodName: string, parameterIndex) {
        QueryParamRC(key)(object, methodName, parameterIndex);
        let parametersSchema: any = GetOpenAPISSMetaData(object, methodName);
        parametersSchema.unshift({
            in: "query",
            name: key,
            schema: {
                type: "string"
            }
        });
        SetOpenAPISSMetaData(parametersSchema, object, methodName);
        OpenAPI({
            parameters: parametersSchema
        })(object, methodName);
    };
}
