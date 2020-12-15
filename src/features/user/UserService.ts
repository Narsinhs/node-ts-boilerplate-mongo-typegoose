import { Service } from "typedi";
import UserModel from "./UserModel";
import { UserRegistrationRequest, UserVerifyRequest, ResendVerifyCodeRequest, UserLoginRequest, ChangePasswordRequest, UserUpdateRequest, FindUserRequest, FacebookLoginRequest} from "./UserRequest";
import random from "random-number";
import bcrypt from "bcrypt";
import { CustomException, ResponseCode, ResponseOrigin, NotFoundException, BadRequestException, FatalErrorException, ForbiddenException } from "../../exception/index";
import { UserVerificationStatus, UserStatus, AuthService } from "../../utils/enums";
import { Verfication } from "../shared/SharedClass";
import { BadRequestError } from "routing-controllers";
import jwt from "jsonwebtoken";
import { User } from "./UserResponse";
import randomstring from "randomstring";
import { ConvertBsonIdsToString } from "../../utils/BsonToString";
import { plainToClass } from "class-transformer";
import EmailHelper from "../../helpers/EmailHelper";
import SMSHelper from "../../helpers/SMSHelper";
import { GetLongLiveTokenFB, GetFBAccountData, GetGoogleAccountData } from "../../helpers/AuthHelper";
import Stripe from "stripe";
import { UpdateStripeCustomerCard, UpdateSubscriptionCustomer, AddCustomerToStripe, AddSubscriptionCustomer } from "../../helpers/SubscriptionHelper";
@Service()
export default class UserService {
    SaltRound = 10;
    PinCodeExpiryHours = 2;
    private async _generateVerficationObject(): Promise<Verfication> {
        const pin: number = random({ integer: true, max: 9999, min: 1000, });
        let pincodeExpiry = new Date();
        pincodeExpiry.setHours(pincodeExpiry.getHours() + this.PinCodeExpiryHours);
        let verfication: Verfication = {
            pincode: 1111,
            status: UserVerificationStatus.NotVerified,
            expiry: pincodeExpiry
        }
        return verfication;
    }
    private async _generateToken(user): Promise<String> {
        return jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    }
    async Register(data: UserRegistrationRequest): Promise<String> {
        let user = await UserModel.findOne(
            { $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }] }
        ).exec();
        const hash: string = await bcrypt.hash(data.password, this.SaltRound);
        let verfication: Verfication = await this._generateVerficationObject();
        if (user && user.verification.status === UserVerificationStatus.Verfied) {
            throw new CustomException("Already Exist", ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
        } else if (user) {
            await UserModel.findByIdAndUpdate(user._id, { password: hash, verification: verfication }).exec()
            // await EmailHelper.SendVerificationCodeMail(user.email, { Code: verfication.pincode });
            // await SMSHelper.SendVerificationCodeSMS(data.phoneNumber, verfication.pincode.toString());
            return "User Register Sucessfully"

        } else {
            try {
                let user = new UserModel({
                    password: hash,
                    verification: verfication,
                    admin: data.admin ? data.admin : false
                })
                user.phoneNumber = data.phoneNumber;
                user.email = data.email;
                // await EmailHelper.SendVerificationCodeMail(user.email, { Code: verfication.pincode });
                await SMSHelper.SendVerificationCodeSMS(data.phoneNumber, verfication.pincode.toString());
                await user.save()
                // Dont need to await it i think. response chala jaye phir baad mai email aye no issue asynchronously
                return "User Register Sucessfully"
            } catch (e) {
                console.log(e)
                throw new BadRequestError()
            }

        }

    }
    async Verify(data: UserVerifyRequest): Promise<String> {
        let user;
        if (data.email) {
            user = await UserModel.findOne({ email: data.email }).exec()
        } else {
            user = await UserModel.findOne({ phoneNumber: data.phoneNumber }).exec()
        }
        if (!user) {
            throw new NotFoundException();
        }
        if (user.verification && user.verification.status === UserVerificationStatus.Verfied) {
            throw new CustomException("Already Verified", ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
        }

        if (user.verification && user.verification.pincode.toString() === data.pin) {

            if ((new Date() < user.verification.expiry)) {
                
                let verification: Verfication = {
                    pincode: undefined,
                    status: UserVerificationStatus.Verfied,
                    expiry: null
                }
                // const updatedUser = await UserModel.findByIdAndUpdate(user._id, { status: UserStatus.Active, verification: verification }, { new: true }).exec();
                const updatedUser = await UserModel.findById(user._id).exec();
             
                let Token = await this._generateToken(updatedUser);
                return Token
            } else {
                throw new CustomException("Verfication Pin Code Expired", ResponseCode.FORBIDDEN, ResponseOrigin.INTERNALSERVER);
            }
        } else {

            throw new CustomException("Verfication Pin Code Invalid OR Expired", ResponseCode.FORBIDDEN, ResponseOrigin.INTERNALSERVER);
        }

    }
    async ResendVerifyCode(data: ResendVerifyCodeRequest): Promise<String> {
        let verfication: Verfication = await this._generateVerficationObject();
        let user;
        if (data.email) {
            user = await UserModel.findOne({ email: data.email }).exec();
        } else {
            user = await UserModel.findOne({ phoneNumber: data.phoneNumber }).exec();
        }
        if (!user) {
            throw new NotFoundException();
        } else if (user && user.verification.status === UserVerificationStatus.Verfied) {
            throw new CustomException("Already Verfied", ResponseCode.UNPROCESSABLE, ResponseOrigin.INTERNALSERVER)
        } else {
            try {
                await UserModel.findByIdAndUpdate(user._id, { verification: verfication }).exec()
                return "Verfication Code Has Been Resend"
            } catch (e) {
                throw new BadRequestError()
            }

        }
    }
    async Login(data: UserLoginRequest): Promise<String> {
        try {
            throw new ForbiddenException();
            let user;
            if (data.email) {
                user = await UserModel.findOne({ email: data.email }).exec();
            } else {
                user = await UserModel.findOne({ phoneNumber: data.phoneNumber }).exec();
            }
            if (!user) {
                throw new CustomException("Please enter a valid email address", ResponseCode.NOT_FOUND, ResponseOrigin.INTERNALSERVER)
            }
            const HashComparision: boolean = await bcrypt.compare(data.password, user.password);
            if (!HashComparision) {
                throw new CustomException("Please Enter A Valid Password", ResponseCode.UNAUTHORIZED, ResponseOrigin.INTERNALSERVER)
            }
            if (user.status === UserStatus.Inactive || user.verification.status === UserVerificationStatus.NotVerified) {
                throw new CustomException("User unverified or inactive", ResponseCode.UNAUTHORIZED, ResponseOrigin.INTERNALSERVER)
            }
            let Token = await this._generateToken(user);
            // await SMSHelper.SendVerificationCodeSMS(user.phoneNumber, "1234");
            return Token
        } catch (e) {
            throw e;
        }
    }
    async ForgotPassword(data: ResendVerifyCodeRequest): Promise<String> {
        let user;
        if (data.email) {
            user = await UserModel.findOne({ email: data.email }).exec();
        } else {
            user = await UserModel.findOne({ email: data.phoneNumber }).exec();
        }
        if (!user) {
            throw new NotFoundException();
        }
        if (user.status === UserStatus.Inactive) {
            throw new CustomException("User is inactive", ResponseCode.UNPROCESSABLE, ResponseOrigin.INTERNALSERVER)
        }
        let newPassword = randomstring.generate(8);
        // let newPassword = "string";
        try {
            const hash = await bcrypt.hash(newPassword, this.SaltRound);
            await UserModel.findByIdAndUpdate(user._id, { password: hash, forgotPassword: true }).exec();
            if(user.email) {
                // await EmailHelper.SendVerificationCodeMail(user.email, { Code: newPassword });
            }
            return "Email Sent! Please Check Your New Password"
        } catch (e) {
            throw new FatalErrorException();
        }
    }
    async ChangePassword(data: ChangePasswordRequest, currentUser): Promise<String> {
        const user = await UserModel.findById(currentUser._id).exec();
        const HashComparision: boolean = await bcrypt.compare(data.password, user.password);
        if (!HashComparision) {
            throw new CustomException("Change Password Sucessfully!", ResponseCode.FORBIDDEN, ResponseOrigin.INTERNALSERVER);
        }
        const hash = await bcrypt.hash(data.newPassword, this.SaltRound);
        try {
            await UserModel.findByIdAndUpdate(user._id, { password: hash, forgotPassword: false }).exec()
            return "Password Has Been Updated"
        } catch (e) {
            throw new FatalErrorException();
        }

    }
    async GetUserById(userId: string): Promise<User> {
        try {
            let user = await UserModel.findById(userId)
                .populate("country")
                .populate("language")
                .populate("religion")
                .populate("city")
                .lean().exec();
            return plainToClass(User, ConvertBsonIdsToString(user)) as any;
        } catch (e) {
            throw new NotFoundException();
        }
    }

    async GetAllUser(data: FindUserRequest,currentUser): Promise<User[]> {

        let findParams: any = {};
        let paginationParams: any = {};

        if (!data.page && !data.limit) {
            data.page = 1;
            data.limit = 10;
        }

        if (data.limit !== -1) {
            paginationParams.take = data.limit;
            paginationParams.skip = ((data.page || 1) * data.limit) - data.limit;
        }
        findParams.status = UserStatus.Active;
        findParams.admin =false;


        let Users: any = await UserModel.find(findParams, {}, { skip: paginationParams.skip, limit: paginationParams.take })
        .lean()
        .exec();
        Users = Users.filter(user=>{
            return user._id !== currentUser._id;
        })
    
        return await plainToClass(User, ConvertBsonIdsToString(Users)) as any
    }

    async UpdateUser(data, Id: string): Promise<String> {
        try {
            console.log(data.preference);
            let response = await UserModel.findByIdAndUpdate(Id, data).lean().exec();
            return "User Updated Successfully"
        } catch (e) {
            throw new FatalErrorException()
        }


    }
    async me(data: User): Promise<User> {
        return plainToClass(User, data);
    } 
    async facebookLogin(data: FacebookLoginRequest) {
        try {
            const longLiveToken = await GetLongLiveTokenFB(data.accessToken);
            const userData: any = await GetFBAccountData(longLiveToken);
            const user = await UserModel.findOne({ email: userData.email }).exec()
            if (user && user.authId === AuthService.facebook) {
                let Token = await this._generateToken(user);
                return Token 
            } else if (user) {
                throw new CustomException("Already Exist with another auth service", ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
            } else {


                let newUser = new UserModel({
                    password: null,
                    verification: {},
                    admin: false,
                    name: userData.name || "",
                    email: userData.email || null,
                    authId: AuthService.facebook,
                    profileImages: userData.picture && userData.picture.data && userData.picture.url ? userData.picture.url : [],
                    dateofbirth: userData.birthday ? new Date(userData.birthday) : null
                })
                const user = await newUser.save();
                let Token = await this._generateToken(user);
                return Token;
            }
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async googleLogin(data: FacebookLoginRequest) {
        try {
            const userData: any = await GetGoogleAccountData(data.accessToken);
            console.log(userData);
            const user = await UserModel.findOne({ email: userData.email }).exec()
            if (user && user.authId === AuthService.gmail) {
                let Token = await this._generateToken(user);
                return Token
            } else if (user) {
                throw new CustomException("Already Exist with another auth service", ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
            } else {


                let newUser = new UserModel({
                    password: null,
                    verification: {},
                    admin: false,
                    name: userData.name || "",
                    email: userData.email || null,
                    authId: AuthService.gmail,
                    profileImages: userData.picture,
                    dateofbirth: userData.birthday ? new Date(userData.birthday) : null
                })
                const user = await newUser.save();
                let Token = await this._generateToken(user);
                return Token;
            }
        } catch (err) {
            throw err;
        }
    }




}