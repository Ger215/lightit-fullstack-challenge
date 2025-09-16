import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegistrationConfirmationEmail(to: string, fullName: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Patient Registration Confirmation',
      template: 'confirmation',
      context: {
        fullName,
      },
    });
  }
}
