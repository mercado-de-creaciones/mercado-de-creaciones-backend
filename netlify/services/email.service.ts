import nodemailer, { Transporter } from "nodemailer";

export interface SendMailOptions {
  from: string;
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
    public mailerHost: string,
    public mailerService: string,
    public mailerEmail: string,
    public mailerPort: number,
    public senderEmailPassword: string,
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
    from,
    to,
    subject,
    htmlBody,
    attachments = [],
  }: SendMailOptions) {
    if (!this.postToProvider) return true;

    const mailOptions = {
      from,
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
