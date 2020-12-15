const OPEN_API_KEY = Symbol("routing-controllers-openapi:OpenAPI");
const SS_API_KEY = Symbol("ss-api:OpenAPI");

export function GetOpenAPISSMetaData(target: object, key: string): Array<any> {
    return Reflect.getMetadata(SS_API_KEY, target.constructor, key) || [];
}

export function SetOpenAPISSMetaData(data: any, target: object, key: string): void {
    Reflect.defineMetadata(SS_API_KEY, data, target.constructor, key);
}
