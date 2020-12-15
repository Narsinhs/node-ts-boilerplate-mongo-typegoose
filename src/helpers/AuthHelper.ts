import request from "request";
import { BadRequestException, ResponseOrigin, ResponseMessage } from "../exception";
export function GetLongLiveTokenFB(accessToken) {
    return new Promise((resolve, reject) => {
        const appId = process.env.FACEBOOK_CLIENT_ID;
        const appSecret = process.env.FACEBOOK_CLIENT_SECRET;
        const options = {
            method: "Get",
            url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${accessToken}`,
        };
        request(options, (error: any, response: any, body: any) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new BadRequestException({}, ResponseMessage.NOVALIDTOKEN, ResponseOrigin.INTERNALSERVER);
                }
                return resolve(bodyJson.access_token);
            } catch (e) {
                reject(e)
            }
        });
    })
}
export function GetFBAccountData(longLiveToken) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            url: `https://graph.facebook.com/v6.0/me?locale=en_US&fields=id,name,email,gender,picture&access_token=${longLiveToken}`,
        };
        request(options, (error: any, response: any, body: any) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new BadRequestException({}, ResponseMessage.NOVALIDTOKEN, ResponseOrigin.INTERNALSERVER);
                }
                resolve(bodyJson);

            } catch (e) {
                reject(e)
            }
        });
    })
}

export function GetGoogleAccountData(accessToken) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        };
        request(options, (err, res, body) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new BadRequestException({}, ResponseMessage.NOVALIDTOKEN, ResponseOrigin.INTERNALSERVER);
                }
                resolve(bodyJson);
            } catch (err) {
                reject(err);
            }
        })
    })
}