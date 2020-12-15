import { prop, getModelForClass, modelOptions, Ref, mongoose } from '@typegoose/typegoose';
import { UserStatus, AuthService } from "../../utils/enums"
import {  Verfication } from '../shared/SharedClass';

@modelOptions({ schemaOptions: { versionKey: false, timestamps: true }, options: { customName: "user" } })
export class User {
  @prop({ default: false })
  admin?: boolean;
  @prop()
  password: string
  @prop({ unique: true })
  email: string
  @prop()
  name: string
  @prop()
  phoneNumber: string;
  @prop({ enum: AuthService, default: AuthService.local })
  authId: number
  @prop({ enum: UserStatus })
  status: UserStatus
  @prop()
  age: number
  @prop({ _id: false })
  verification: Verfication
  @prop()
  forgotPassword: boolean
}

const UserModel = getModelForClass(User);
export default UserModel;