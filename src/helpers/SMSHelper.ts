import twilio from "twilio";
import { render as MustacheRender } from "mustache"

export const SMSTemplate = {
    VERIFICATION_CODE: `Your Verification Code for {{APP_NAME}} is: {{CODE}}`
}

export default class SMSHelper {
    private static _instance = null;
    private constructor() { }

    private static GetInstance() {
        if (this._instance == null) {
            this._instance = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_KEY);
        }

        return this._instance;
    }

    private static sendSMS(to: string, content: string) {
        return this.GetInstance().messages.create({
            from: process.env.TWILIO_ACCOUNT_NUMBER,
            to: to,
            body: content
        });
    }

    static async SendVerificationCodeSMS(to: string, code: string) {
        const content: string = MustacheRender(SMSTemplate.VERIFICATION_CODE, {
            APP_NAME: process.env.APP_NAME,
            CODE: code
        })

        try {
            return await this.sendSMS(to, content);
        } catch (err) {
            console.log(err);
        }
    }
}