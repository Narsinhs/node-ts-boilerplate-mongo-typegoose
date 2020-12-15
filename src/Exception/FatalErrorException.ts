import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import { ResponseException } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class FatalErrorException extends ResponseException {
    public Status = ResponseCode.SERVER_ERROR;
    constructor(origin?: ResponseOrigin, message?: ResponseMessage) {
        super(message || ResponseMessage.SERVER_ERROR, origin || ResponseOrigin.INTERNALSERVER);
    }
}
