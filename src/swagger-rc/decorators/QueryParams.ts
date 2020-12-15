import { QueryParams as QueryParamsRC } from "routing-controllers";
import { getFromContainer, MetadataStorage } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { OpenAPI } from "routing-controllers-openapi";
import { GetOpenAPISSMetaData, SetOpenAPISSMetaData } from "../../helpers/OpenAPIHelper";

export function QueryParams(): Function {
    return function(object: Object, methodName: string, parameterIndex) {
        QueryParamsRC()(object, methodName, parameterIndex);
        const paramTypes: Array<any> = Reflect.getMetadata("design:paramtypes", object, methodName);
        const targetType = paramTypes[parameterIndex];
        const metadatas = validationMetadatasToSchemas((getFromContainer(MetadataStorage) as any).validationMetadatas, {});
        if (metadatas[targetType.name]) {
            let metaData = metadatas[targetType.name];
            let parametersSchema: any = GetOpenAPISSMetaData(object, methodName);
            for (const key in metaData.properties) {
                let data: any = metaData.properties[key];
                parametersSchema.push({
                    in: "query",
                    name: key,
                    schema: {
                        type: data.enum ? "number" : data.type ? data.type : "string",
                        $ref: "",
                        items: data.items
                    },
                    required: false,
                    description : data.oneOf ? " YYYY-MM-DD" : ``
                });
            }
            SetOpenAPISSMetaData(parametersSchema, object, methodName);
            OpenAPI({
                parameters: parametersSchema
            })(object, methodName);
        }
    };
}
