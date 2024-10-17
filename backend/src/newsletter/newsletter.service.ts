import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NewsletterService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendNewsletterEmail(to: string): Promise<void> {
    try {
      // Log para garantir que todos os valores necessários estejam configurados
      console.log('Sending email with the following options:');
      console.log('TO:', to);
      console.log('FROM:', process.env.SENDGRID_FROM_EMAIL);

      // Verifique se as variáveis de ambiente estão definidas corretamente
      if (
        !process.env.SENDGRID_FROM_EMAIL ||
        !process.env.SENDGRID_TEMPLATE_ID
      ) {
        throw new Error('SendGrid configuration is incomplete');
      }

      const mailOptions: Partial<sgMail.MailDataRequired> = {
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
      const response = await sgMail.send(
        mailOptions as sgMail.MailDataRequired,
      );

      console.log('SendGrid response:', response);

      if (response && response[0] && response[0].statusCode === 202) {
        console.log('Email sent successfully');
      } else {
        console.error(
          `Unexpected status code: ${response[0]?.statusCode || 'Unknown'}`,
        );
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error(
          'SendGrid error response:',
          JSON.stringify(error.response.body, null, 2),
        );
      }
    }
  }
}
