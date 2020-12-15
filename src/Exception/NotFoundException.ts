
import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class NotFoundException {
    public Status: number;
    public Message: string;
    public Origin: ResponseOrigin;
     constructor(message?: string , origin?: ResponseOrigin) {
        this.Message = message || ResponseMessage.DefaultNotFound;
        this.Status = 404;
        this.Origin = origin || ResponseOrigin.INTERNALSERVER;
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
