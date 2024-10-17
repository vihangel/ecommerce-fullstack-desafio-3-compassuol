"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const sgMail = require("@sendgrid/mail");
let NewsletterService = class NewsletterService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
    async sendNewsletterEmail(to) {
        try {
            console.log('Sending email with the following options:');
            console.log('TO:', to);
            console.log('FROM:', process.env.SENDGRID_FROM_EMAIL);
            if (!process.env.SENDGRID_FROM_EMAIL ||
                !process.env.SENDGRID_TEMPLATE_ID) {
                throw new Error('SendGrid configuration is incomplete');
            }
            const mailOptions = {
                to,
                from: process.env.SENDGRID_FROM_EMAIL,
                subject: 'Bem-vindo à newsletter',
                content: [
                    {
                        type: 'text/plain',
                        value: 'and easy to do anywhere, even with cURL',
                    },
                ],
                html: '<p>Example HTML content</p>',
            };
            console.log('Sending email with dynamic template...');
            const response = await sgMail.send(mailOptions);
            console.log('SendGrid response:', response);
            if (response && response[0] && response[0].statusCode === 202) {
                console.log('Email sent successfully');
            }
            else {
                console.error(`Unexpected status code: ${response[0]?.statusCode || 'Unknown'}`);
            }
        }
        catch (error) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error('SendGrid error response:', JSON.stringify(error.response.body, null, 2));
            }
        }
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map