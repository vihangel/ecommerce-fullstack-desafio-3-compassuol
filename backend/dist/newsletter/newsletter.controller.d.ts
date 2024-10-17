import { NewsletterService } from './newsletter.service';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    sendNewsletter(body: {
        to: string;
        subject: string;
        content: string;
    }): Promise<{
        message: string;
    }>;
}
