import { Param as ParamRC } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { GetOpenAPISSMetaData, SetOpenAPISSMetaData } from "../../helpers/OpenAPIHelper";

export function Param(key): Function {
    return function(object: Object, methodName: string, parameterIndex) {
        ParamRC(key)(object, methodName, parameterIndex);
        let parametersSchema: any = GetOpenAPISSMetaData(object, methodName);
        parametersSchema.unshift({
            in: "path",
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
