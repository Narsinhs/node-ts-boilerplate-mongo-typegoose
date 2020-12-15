import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import { ResponseException } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class BadRequestException {
    // public Status = ResponseCode.BAD_REQUEST;
    public Status: number;
    public Message: string;
    public Origin: ResponseOrigin;
    public Description: object;
    constructor(Description?: object, message?: ResponseMessage, origin?: ResponseOrigin) {
        this.Message = message || ResponseMessage.BAD_REQUEST;
        this.Status = ResponseCode.BAD_REQUEST;
        this.Origin = origin || ResponseOrigin.INTERNALSERVER;
        this.Description = Description || {};
    }
    public GetMessage(): string {
        return this.Message;
    }

    public GetStatus(): number {
        return this.Status;
    }
    public GetOrigin(): ResponseOrigin {
        return this.Origin;
    }
}
