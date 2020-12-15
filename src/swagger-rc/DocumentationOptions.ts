import { ResponsesObject } from "openapi3-ts";

export interface ResponseOptions {
    model: Function | string | any;
    description: string;
    isArray?: boolean;
    code?: number;
}

export interface DocumentationOptions {
    successResponseOptions?: ResponseOptions;
    responsesObject?: ResponsesObject;
}


