export abstract class ResponseException {
    public Status: number;
    public Message: string;
    public Origin: ResponseOrigin;
    protected constructor(message: ResponseMessage, origin: ResponseOrigin) {
        this.Message = message;
        this.Origin = origin;
    }
    public GetMessage(): string {
        return this.Message;
    }

    public GetStatus(): number {
        return this.Status;
    }
}
export enum ResponseCode {
    ALREADYEXIST = 501,
    BAD_REQUEST = 400,
    REQUEST_FAILED = 402,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    CONFLICT = 409,
    TOO_MANY_REQUEST = 429,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    SUCCESS = 200,
    UNPROCESSABLE = 422
}

export enum ResponseOrigin {
    AWS = "AWS S3",
    STRIPE = "STRIPE",
    INTERNALSERVER = "INTERNAL SERVER",
    ESTATEDSERVER = "ERROR ON ESTATED SERVER",
    DIRECTMAILER = "ERROR DIRECT MAILER"
}

export enum ResponseMessage {
    BAD_REQUEST = "The request was unacceptable, often due to missing a required parameter.",
    Unauthorized = "No valid API key provided.",
    REQUEST_FAILED = "The parameters were valid but the request failed.",
    FORBIDDEN = "The User/Api-key doesn't have permissions to perform the request.",
    NOTFOUND = "The requested resource doesn't exist",
    CONFLICT = "The request conflicts with another request (perhaps due to using the same idempotent key).",
    TOO_MANY_REQUEST = "Too Many Requests	Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.",
    SERVER_ERROR = "Server Errors	Something went wrong",
    FATALERROR = "Unexpected Error Occurs",
    UNAUTHORIZED = "Unauthorized or No Permission for request. Token Mismatch.",
    NOVALIDTOKEN = "No Such Valid Token for facebook",
    UNPROCESSABLE = "This request is  Unprocessable,often due to key is already exists",
    NOTVERIFIEDORNOTADDEDSUBSCRIPTIONPACKAGE = "This request can't be process, due to company status or subscription package or member is not exist in company",
    COMPANYANDUSERMISSEDMATCH = " Company and user is missed match",
    ADDRESSNOTPARSE = "Address not parse",
    UNABLETOFINDOUTREQUEST = "We were unable to find results for the request.",
    THREEATTEMPTFAILD = "3 times login attempt is failed, your account is locked for security reasons. Click Forgot password to reset",
    COMPANYSTATUSISUNACTIVE = "Company status is inactive ",
    // SUCCESS = "Success",
    // SUCCESS_WITH_NO_CONTENT = "No Content",
    // FORBIDDEN = "Not allowed for performing this action.",
    // BAD_REQUEST = "Bad Request. Please verify your request input.",
    // SERVER_ERROR = "Internal Server Error",
    // NOT_FOUND = "Resource Not found",
    // DefaultForbidden= "Access not allowed",
    // Default= "Message Error",
    // FieldValidationErrors= "%{field} must be %{constraints}",
    // IsEmailConstraint= "",
    // MultipleValuesGlue= ",",
    DefaultNotFound = "Resource not found",
    // DefaultServerError= "Something went wrong",
    // DefaultBadRequest= "Bad request, Check input",
    DefaultUnAuthorized = "Not Authorized/ No token provided",
    // EmailAlreadyExists= "Email already exists",
    // EmailNotRegistered= "Email not registered",
    // EmailUnVerified= "Email is not verified",
    // InvalidAgentIds= "Invalid Agent Ids",
    // InvalidCredentials= "Invalid Credentials",
    // InvalidIconId= "IconId is Invalid",
    // InvalidIconIdType= "IconId should be of image type",
    // WebsiteNotFound= "Website not found",
    // MinConstraint= "greater",
    // Address= "950 E. State Highway 114, Suite 160, Southlake, Texas, 76092",
    // PhoneNumber= "+1-646-801-9992",
    // Email= "support@app.io",
    // DontLikeEmails= "Don't like these emails?",
    // Unsubscribe= "Unsubscribe",
    // ResetPasswordDescription= "It's time to set your new Password",
    // ResetPasswordTitle= "Reset Password",
    // ResetPasswordName= "",
    // tslint:disable-next-line: max-line-length
    // ResetPasswordPurpose= "Please verify your email address by clicking on the button or paste this given url in browser" ,
    // ResetPasswordEndingWords= "Thank you ,Good Luck",
    // ResetPasswordSubject= "Reset Password",
    // ResetPasswordButtonText= "Verify Email"
}
