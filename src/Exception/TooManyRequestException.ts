import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class FatalErrorException extends ResponseException {
    public Status = ResponseCode.TOO_MANY_REQUEST;
    constructor(message?: ResponseMessage, origin?: ResponseOrigin) {
        super(message || ResponseMessage.TOO_MANY_REQUEST , origin || ResponseOrigin.INTERNALSERVER);
    }
}
