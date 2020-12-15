import { ExpressMiddlewareInterface, Middleware, ExpressErrorMiddlewareInterface, BadRequestError } from "routing-controllers";
import * as Exception from "../exception/index"
import { ResponseException, CustomException, NotFoundException, BadRequestException, ForbiddenException, UnAuthorizedException } from "../exception/index";

@Middleware({type: "after"})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: any, request: any, res: any, next: (err?: any) => any): void {
        console.log(err , " this is error")
        if (err instanceof BadRequestException) {
            res.status(402).json({
                data: null,
                message: this._prepareBadRequestErrors(err),
                status: err.Status,
                success: false
            });
        } else if (err instanceof ResponseException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }else if (err instanceof ForbiddenException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        } else if (err instanceof CustomException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        } else if (err instanceof NotFoundException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        } 
        else if (err instanceof UnAuthorizedException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }    
        else if (err instanceof BadRequestException) {
            res.status(200).json({
                data: null,
                description: err.Description || null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        } else if (!(err instanceof ResponseException) ) {
            err = new Exception.FatalErrorException(Exception.ResponseOrigin.INTERNALSERVER, Exception.ResponseMessage.FATALERROR);
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
        
    }
    private _prepareBadRequestErrors(error: any): any {
        let errors: any = {};
        // console.log(error.constraints);
        let func = function (err) {
            console.log(err.constraints, "  this is const")
            if (err.property && err.constraints) {
                let constraints: Array<string> = [];
                for (let constraint in err.constraints) {

                    if (constraint === "customValidation") {
                        errors[err.property] = [err.constraints[constraint]];
                    } else {
                        constraints.push(err.constraints[`${constraint}`]);
                    }
                }
                if (constraints.length > 0) {
                    errors[err.property] = constraints;
                }
            } else if (Array.isArray(err.children) && err.children.length > 0) {
                for (let child of err.children) {
                    func(child);
                }
            }
        };
        if (error && error.errors && Array.isArray(error.errors)) {
            for (let err of error.errors) {
                func(err);
            }
        }
        return errors;
    }
}