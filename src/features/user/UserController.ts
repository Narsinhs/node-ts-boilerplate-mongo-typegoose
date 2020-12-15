import { JsonController, Body, QueryParam, CurrentUser } from "routing-controllers";
import UserService from "./UserService";
import { Put, Post, Get, QueryParams, Authorized, Param } from "../../swagger-rc/decorators";
import { UserRegistrationRequest, UserVerifyRequest, ResendVerifyCodeRequest, UserLoginRequest, ChangePasswordRequest, UserUpdateRequest, FindUserRequest, FacebookLoginRequest } from "./UserRequest";
import { GetUserLoginResponse, AllUsersResponse, UserResponse, User } from "./UserResponse";
import { DataResponse, MessageResponse } from "../../response/common";

@JsonController("/user")
class UserController {
    constructor(private _userService: UserService) { }
    @Post("/register", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Register User"
        }
    })
    async Register(@Body({ validate: true }) user: UserRegistrationRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.Register(user))
    }
    @Post("/facebook", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Register User With Facebook"
        }
    })
    async facebookRegister(@Body({ validate: true }) data: FacebookLoginRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.facebookLogin(data))
    }
    @Post("/google", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Register User With Google"
        }
    })
    async googleRegister(@Body({ validate: true }) data: FacebookLoginRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.googleLogin(data))
    }
    @Post("/login", {
        successResponseOptions: {
            model: GetUserLoginResponse,
            description: "Register User"
        }
    })
    async Login(@Body({ validate: true }) user: UserLoginRequest): Promise<GetUserLoginResponse> {
        return new DataResponse(await this._userService.Login(user), " Login Successful");
    }
    @Post("/forgot", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Forgot Password"
        }
    })
    async ForgotPassword(@Body({ validate: true }) user: ResendVerifyCodeRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.ForgotPassword(user));
    }
    @Authorized()
    @Post("/change/password", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Forgot Password"
        }
    })
    async ChangePassword(@Body({ validate: true }) data: ChangePasswordRequest, @CurrentUser({ required: true }) user): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.ChangePassword(data, user));
    }
    @Authorized()
    @Put("/update", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Update User"
        }
    })
    async UpdateUser(@Body({ validate: true }) data: UserUpdateRequest, @CurrentUser({ required: true }) user): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.UpdateUser(data, user._id));
    }
  
    @Get("/verify", {
        successResponseOptions: {
            model: GetUserLoginResponse,
            description: "Verify User"
        }
    })
    async Verify(@QueryParams() data: UserVerifyRequest): Promise<GetUserLoginResponse> {
        return new DataResponse(await this._userService.Verify(data), "User Verified Sucessfully");
        
    }
    @Get("/resend/pin", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Resend Verification Code"
        }
    })
    async ResendCode(@QueryParams() data: ResendVerifyCodeRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.ResendVerifyCode(data));
    }
    @Authorized()
    @Get("/active/me", {
        successResponseOptions: {
            model: UserResponse,
            description: "Resend Verification Code"
        }
    })
    async Me(@CurrentUser({ required: true }) user): Promise<UserResponse> {
        return new DataResponse(await this._userService.me(user), " User Data Found");
    }
    @Authorized()
    @Get("/preference", {
        successResponseOptions: {
            model: AllUsersResponse,
            description: "User Preferences"
        }
    })
    async Preference(@CurrentUser({ required: true }) user,@QueryParams() data: FindUserRequest): Promise<AllUsersResponse> {
        return new DataResponse(await this._userService.GetAllUser(data,user), "Fetched based upon Preferences!");
    }
    @Authorized()
    @Get("/id/:Id", {
        successResponseOptions: {
            model: UserResponse,
            description: "Resend Verification Code"
        }
    })
    async GetUserById(@Param("Id") userId: string): Promise<UserResponse> {
        return new DataResponse(await this._userService.GetUserById(userId), "User Found Successfully")
    }
    @Authorized()
    @Get("/", {
        successResponseOptions: {
            model: AllUsersResponse,
            description: "Get All User"
        }
    })
    async GetAllUser(@CurrentUser({ required: true }) user,@QueryParams() data: FindUserRequest): Promise<AllUsersResponse> {
        return new DataResponse(await this._userService.GetAllUser(data,user), "All User Fetched Successfully")
    }
    //save icon route 
    // call API se data set pick arega then call generatelogo(dataset) 
    // return type all saved icon 


}
export default UserController;
