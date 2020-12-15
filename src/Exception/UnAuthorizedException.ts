import { ResponseMessage, ResponseOrigin, } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";

export class UnAuthorizedException extends ResponseException {
    public Status = ResponseCode.UNAUTHORIZED;

    constructor(message?: ResponseMessage, origin?: ResponseOrigin) {
        super(message || ResponseMessage.DefaultUnAuthorized, origin || ResponseOrigin.INTERNALSERVER);
    }
}
