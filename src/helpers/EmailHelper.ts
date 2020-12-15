import { Transport, createTransport } from "nodemailer";
import * as path from "path";
import { readFileSync } from "fs";
import { render as MustacheRender } from "mustache";

export const EmailTemplates = {
    VERIFICATION_CODE: path.join(__dirname, "..", "templates", "VerificationCodeTemplate.html"),
    FORGOT_PASSWORD : path.join(__dirname ,"..", "templates" , "ForgotPasswordTemplate.html")
};

const EmailTemplateSubject = {
    VERIFICATION_CODE: "Account Verification Code.",
    FORGOT_PASSWORD : "FORGOT PASSWORD CODE"
};

export default class EmailHelper {
    private static _instance = null;

    private constructor() { }

    private static GetInstance() {
        if (this._instance == null) {
            console.log(process.env.SMTP_USER, process.env.SMTP_PASS , "check cered")
            this._instance = createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
        }

        return this._instance;
    }

    private static _getTemplateHtml(templatePath: string, data: any): string {
        const htmlTemplate: string = readFileSync(templatePath, "utf-8");
        return MustacheRender(htmlTemplate, { ...data });
    }

    private static async _sendMail(to: string, subject: string, body: string) {
        return await this.GetInstance().sendMail({
            from: process.env.APP_NAME,
            to,
            subject,
            html: body,
        });
    }

    static async SendVerificationCodeMail(email: string, data: any) {
        const html: string = this._getTemplateHtml(EmailTemplates.VERIFICATION_CODE, { Code: data.Code });
        try {
            console.log("****************** trying to send email **********************");
            return await this._sendMail(email, EmailTemplateSubject.VERIFICATION_CODE, html);
            console.log("mail sent oytu")
        } catch (err) {
            console.log(err);
        }
    }
    static async SendFPMail(email: string, data: any) {
        const html: string = this._getTemplateHtml(EmailTemplates.VERIFICATION_CODE, { Code: data.Code });
        try {
            console.log("****************** trying to send email **********************");
            return await this._sendMail(email, EmailTemplateSubject.FORGOT_PASSWORD, html);
            console.log("mail sent oytu")
        } catch (err) {
            console.log(err);
        }
    }
    static async SendMailWithAttachment(to: string, subject: string, body: string ,attachment ){
        return await this.GetInstance().sendMail({
            from: process.env.APP_NAME,
            to,
            subject,
            attachment,
            html: body,
        });
    }
}
