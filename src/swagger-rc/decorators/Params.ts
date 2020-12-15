import { Params as ParamsRC } from "routing-controllers";
import { getFromContainer, MetadataStorage } from "class-validator";
import { OpenAPI } from "routing-controllers-openapi";
import { GetOpenAPISSMetaData, SetOpenAPISSMetaData } from "../../helpers/OpenAPIHelper";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export function Params(): Function {
    return function(object: Object, methodName: string, parameterIndex) {
        ParamsRC()(object, methodName, parameterIndex);
        const paramTypes: Array<any> = Reflect.getMetadata("design:paramtypes", object, methodName);
        const targetType = paramTypes[parameterIndex];
        const metadatas = validationMetadatasToSchemas((getFromContainer(MetadataStorage) as any).validationMetadatas, {});
        if (metadatas[targetType.name]) {
            let metaData = metadatas[targetType.name];
            let parametersSchema: any = GetOpenAPISSMetaData(object, methodName);
            for (const key in metaData.properties) {
                let data: any = metaData.properties[key];
                parametersSchema.unshift({
                    in: "path",
                    name: key,
                    schema: {
                        type: data.type ? data.type : "string",
                        $ref: "",
                        items: data.items
                    },
                    required: true
                });
            }
            SetOpenAPISSMetaData(parametersSchema, object, methodName);
            OpenAPI({
                parameters: parametersSchema
            })(object, methodName);
        }
    };
}
