import { ResponseMessage, ResponseOrigin } from "./ResponseException";
import {ResponseException  } from "./ResponseException";
import { ResponseCode } from "./ResponseException";
export class CustomException {
    public Status: number;
    public Message: string;
    public Origin: ResponseOrigin;
    public constructor(message: string, status: number, Origin: ResponseOrigin) {
        this.Message = message;
        this.Status = status;
        this.Origin = Origin;
    }
    public GetMessage(): string {
        return this.Message;
    }

    public GetStatus(): number {
        return this.Status;
    }
}
