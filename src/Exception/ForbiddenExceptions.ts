import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class ForbiddenException extends ResponseException {
    public Status = ResponseCode.FORBIDDEN;
    constructor(message?: ResponseMessage, origin?: ResponseOrigin) {
        super(message || ResponseMessage.FORBIDDEN, origin || ResponseOrigin.INTERNALSERVER);
    }
}
