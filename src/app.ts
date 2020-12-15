import "reflect-metadata";
import express from "express";
import * as http from "http";
import { join } from "path";
import { Container } from "typedi";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import MongoConnection from "./loaders/mongo";
import swaggerui from "swagger-ui-express";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandler";
import UserController from "./features/user/UserController";
import { DocumentController } from "./swagger-rc/DocumentController";

import { UnAuthorizedException } from "./exception";
import jwt from "jsonwebtoken";
import UserModel from "./features/user/UserModel";
import { ConvertBsonIdsToString } from "./utils/BsonToString";

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use("/swagger", swaggerui.serve, swaggerui.setup(null, { swaggerUrl: "/swagger.json", explorer: true }));
app.use(cors());

useContainer(Container);
useExpressServer(app, {
    development: true,
    controllers: [
        DocumentController,
        UserController
    ],
    middlewares: [ErrorHandlerMiddleware],
    validation: {
        skipMissingProperties: false,
        whitelist: true,
        validationError: { target: true, value: true },
    },
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: async (action: Action, roles: string[]): Promise<boolean> => {
        console.log("in authorization CHECKKKK")
        console.log("in authorization CHECKKKK")
        console.log("in authorization CHECKKKK")
        console.log("in authorization CHECKKKK")
        const bearer = action.request.headers[process.env.AUTHORIZATION_HEADER_KEY];
        if (bearer) {
            const token = bearer.split(" ")[1];
            return jwt.verify(token, process.env.SECRET_KEY, async (err: any, decoded: any) => {
                if (err) {
                    throw new UnAuthorizedException();
                }
                try{
                    let user = await UserModel.findById(decoded._id)
                        .lean()
                        .exec();

           
                if (user) {
                    user = ConvertBsonIdsToString(user);
                    action.request.User = user;
                }

                if (user && !roles.length) {
                    return true;
                }
                if (roles[0] === "admin" && user.admin) {
                    return true;
                }

                throw new UnAuthorizedException();
            } catch(e) { 
                console.log(e);
                throw e;
            }
            });
        } else {
            throw new UnAuthorizedException();
        }
    },
    currentUserChecker: async (action: Action) => {
        if (action.request.User) {
            return action.request.User;
        }
        return null;
    },
});

const server = http.createServer(app);
console.log(__dirname," this is dir in dist folder yar")
app.use(express.static(__dirname + '\\output'));
MongoConnection();
server.listen(process.env.PORT || 3000, () => {
    console.log(`###Server running on port ${process.env.PORT || 3000}###`);
});
