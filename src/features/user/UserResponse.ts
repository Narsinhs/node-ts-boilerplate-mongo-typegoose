import { IsString, IsEmail, IsArray, ValidateNested, IsBoolean, IsEnum, IsNumber, IsInt, Validate } from "class-validator";
import { Exclude, Type } from "class-transformer"
import { UserStatus } from "../../utils/enums";



export class User {
    @Type(() => String)
    public _id: any;

    @IsBoolean()
    @Exclude()
    admin?: boolean;

    @IsString()
    @Exclude()
    password: string

    @IsEmail()
    email: string = null;

    @IsString()
    name: string = null;



    @IsString()
    phoneNumber: string = null;









    @IsString()
    authId: string = null;

    ;

    @IsEnum(UserStatus)
    @IsInt()
    status: UserStatus = null;


    @IsNumber()
    age: number = null;


    @Exclude()
    @IsString()
    createdAt: string
    @Exclude()
    @IsString()
    updatedAt: string
}



export class GetUserLoginResponse {
    @IsString()
    data: string
    @IsInt()
    status: number;
    @IsBoolean()
    success: boolean
    @IsString()
    message: string
}



export class AllUsersResponse {
    @IsArray()
    @ValidateNested({ each: true })
    data: User;
    @IsInt()
    status: number;
    @IsBoolean()
    success: boolean
    @IsString()
    message: string
}
export class UserResponse {
    @Type((val) => User)
    @Validate(() => true)
    data: User;
    @IsInt()
    status: number;
    @IsBoolean()
    success: boolean
    @IsString()
    message: string
}