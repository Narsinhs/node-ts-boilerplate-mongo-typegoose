import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class FatalErrorException extends ResponseException {
    public Status = ResponseCode.REQUEST_FAILED;
    constructor(message?: ResponseMessage, origin?: ResponseOrigin) {
        super(message || ResponseMessage.REQUEST_FAILED , origin || ResponseOrigin.INTERNALSERVER);
    }
}
