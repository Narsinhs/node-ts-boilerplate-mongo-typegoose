import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class FatalErrorException extends ResponseException {
    public Status = ResponseCode.CONFLICT;
    constructor(message?: ResponseMessage, origin?: ResponseOrigin) {
        super(message || ResponseMessage.CONFLICT , origin || ResponseOrigin.INTERNALSERVER);
    }
}
