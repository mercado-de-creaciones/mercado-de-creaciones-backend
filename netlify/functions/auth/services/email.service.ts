
export interface EmailServiceOptions {
  mailerHost: string;
  mailerPort: number;
  mailerUser: string;
  senderEmailPassword: string;
  readonly postToProvider: boolean;
}

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
  private readonly mailerEndpoint: string = "https://api.resend.com/emails";

  constructor(
    public senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {}

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
      const sentInformation = await fetch(this.mailerEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.senderEmailPassword}`,
        },
        body: JSON.stringify(mailOptions),
      });
      console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
