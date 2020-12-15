import { prop } from "@typegoose/typegoose";
import { UserVerificationStatus } from "../../utils/enums";
import {  IsInt, IsDate, IsEnum } from "class-validator";
export class Verfication {
  @prop()
  @IsInt()
  pincode: number
  @IsDate()
  @prop()
  expiry: Date
  @IsEnum(UserVerificationStatus)
  @prop()
  @IsInt()
  status: UserVerificationStatus
}


