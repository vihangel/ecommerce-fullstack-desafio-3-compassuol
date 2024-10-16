import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('send')
  async sendNewsletter(
    @Body() body: { to: string; subject: string; content: string },
  ) {
    try {
      await this.newsletterService.sendNewsletterEmail(
        body.to,
        // body.subject,
        // body.content,
      );
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error in sendNewsletter:', error.message);
      throw new HttpException(
        { error: 'Could not send email', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
