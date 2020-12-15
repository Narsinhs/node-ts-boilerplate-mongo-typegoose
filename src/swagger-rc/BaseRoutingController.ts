import { DocumentationOptions, ResponseOptions } from "./DocumentationOptions";
import { ResponsesObject } from "openapi3-ts";
import { OpenAPI } from "routing-controllers-openapi";
import { ResponseSchema } from "./ResponseSchema";
import { ResponseCode, ResponseMessage } from "../exception";
import {MessageResponse} from "../response/index"

export class BaseRoutingControllerExt {
    /**
     * Overwrite Generic response list by response object(provided from controller)
     * @param responseObject
     */
    static GetGenericResponseList(responseObject: ResponsesObject): any {
        //TODO:It will be created by enum
        let genericResponseList = [
            {
                code: ResponseCode.NOT_FOUND,
                description: ResponseMessage.NOTFOUND,
                model:{Message: MessageResponse}
            },
            {
                code: ResponseCode.BAD_REQUEST,
                description: ResponseMessage.BAD_REQUEST,
                model:{Message: MessageResponse}
            },
            {
                code: ResponseCode.UNAUTHORIZED,
                description: ResponseMessage.UNAUTHORIZED,
                model:{Message: MessageResponse}
            },
            {
                code: ResponseCode.FORBIDDEN,
                description: ResponseMessage.FORBIDDEN,
                model:{Message: MessageResponse}
            },
            {
                code: ResponseCode.SERVER_ERROR,
                description: ResponseMessage.SERVER_ERROR,
                model:{Message: MessageResponse}
            }
        ];
        if (!responseObject) {
            return genericResponseList;
        }

        //Get status code from custom response object
        //[401,400]
        let responseStatusList: string[] = Object.keys(responseObject);
        //Remove response from generic responses list if exits in custom response object
        for (let status of responseStatusList) {
            //Return undefined if it not found
            let index = genericResponseList.findIndex(element => {
                return element.code.toString() == status;
            });
            //If exits
            if (index > -1) {
                genericResponseList.splice(index, 1);
            }
        }
        return genericResponseList;
    }

    static InitUriDocumentation(options: DocumentationOptions = {}): Function {
        return function(object, methodName) {
            const GENERIC_RESPONSES: ResponseOptions[] = BaseRoutingControllerExt.GetGenericResponseList(options.responsesObject);
            //check successResponseOption(200 status code) and invoke function
            if (options && options.successResponseOptions) {
                ResponseSchema(options.successResponseOptions)(object, methodName);
            }
            //Invoke openApi decorator factory for response
            if (options && options.responsesObject) {
                OpenAPI({
                    responses: options.responsesObject
                })(object, methodName);
            }
            //Generic Response Messages
            for (let response of GENERIC_RESPONSES) {
                ResponseSchema(response)(object, methodName);
            }
            //End of Generic Response Messages
        };
    }
}
