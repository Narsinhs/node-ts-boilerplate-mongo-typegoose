import { IsEmail, IsString, Min, Max, Length, IsOptional, IsBoolean, IsNumber, ValidateNested, IsEnum, IsArray, IsDate, IsInt } from "class-validator";
import { UserStatus } from "../../utils/enums";
import { Type, Exclude, Transform } from "class-transformer";

export class UserRegistrationRequest {
    @IsEmail()
    email: string
    @IsString()
    phoneNumber: string
    @IsString()
    @Length(6, 14)
    password: string
    @IsOptional()
    @IsBoolean()
    admin: boolean
}

export class UserLoginRequest {
    @IsEmail()
    @IsOptional()
    email: string
    @IsString()
    @IsOptional()
    phoneNumber: string
    @IsString()
    @Length(6, 14)
    password: string
}
export class UserVerifyRequest {
    @IsEmail()
    @IsOptional()
    email: string
    @IsString()
    @IsOptional()
    phoneNumber: string
    @IsString()
    pin: string
}

export class ResendVerifyCodeRequest {
    @IsEmail()
    @IsOptional()
    email: string
    @IsString()
    @IsOptional()
    phoneNumber: string
}
export class ChangePasswordRequest {
    @IsString()
    password: string
    @IsString()
    newPassword: string
}


export class UserUpdateRequest {
    @IsOptional()
    @IsString()
    name: string
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    age: number;

}

export class FindUserRequest {
    @IsOptional()
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    phoneNumber: string;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsEnum(UserStatus, { each: true })
    @IsInt()
    status: UserStatus;

    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    age: number;



    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    limit: number;
}


export class FacebookLoginRequest {

    @IsString()
    accessToken: string;

}




