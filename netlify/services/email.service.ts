import nodemailer, { Transporter } from "nodemailer";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    mailerHost: string,
    mailerService: string,
    mailerEmail: string,
    mailerPort: number,
    senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      host: mailerHost,
      service: mailerService,
      port: mailerPort,
      secure: true,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail({
    to,
    subject,
    htmlBody,
    attachments = [],
  }: SendMailOptions) {
    if (!this.postToProvider) return true;

    const mailOptions = {
      to,
      subject,
      html: htmlBody,
      attachments,
    };

    try {
      const sentInformation = await this.transporter.sendMail(mailOptions);
      console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
