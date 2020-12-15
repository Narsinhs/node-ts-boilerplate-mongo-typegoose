import { Allow, IsBoolean, IsInt, IsString, ValidateNested, Validate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class DataResponse {
    data:any;
    @IsBoolean()
    success:boolean;
    @IsInt()
    status:number;
    @IsString()
    message:string
    constructor(data,message) { 
        this.data = data;
        this.status = 200;
        this.success = true;
        this.message = message;
    }
}

export class MessageResponse {
    @IsBoolean()
    success:boolean;
    @IsInt()
    status:number;
    @IsString()
    message:string
    constructor(message) {
        this.status = 200;
        this.success = true;
        this.message = message;
    }
}