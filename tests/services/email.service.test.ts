import { EmailService } from '../../netlify/services/email.service';
import nodemailer from "nodemailer";

describe("Probar EmailService", () => {
  const mockSendEmail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  const sendEmailOptions = {
    from: "from@example.com",
    to: "to@example.com",
    subject: "Test Subject",
    htmlBody: "<p>Test Body</p>",
  };

  test("No debe enviar un email cuando 'postToProvider' es 'false'", async () => {
    const emailService = new EmailService({
      mailerHost: "smtp.example.com",
      mailerPort: 587,
      mailerUser: "user@example.com",
      senderEmailPassword: "password",
      postToProvider: false,
    });

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(true);
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  test("Debe enviar un email cuando 'postToProvider' es 'true'", async () => {
    mockSendEmail.mockResolvedValue("Email sent");

    const emailService = new EmailService({
      mailerHost: "smtp.example.com",
      mailerPort: 587,
      mailerUser: "user@example.com",
      senderEmailPassword: "password",
      postToProvider: true,
    });

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(true);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  test("Debe manejar un error cuando falla el envío de un email", async () => {
    mockSendEmail.mockRejectedValue("Failed to send email");

    const emailService = new EmailService({
      mailerHost: "smtp.example.com",
      mailerPort: 587,
      mailerUser: "user@example.com",
      senderEmailPassword: "password",
      postToProvider: true,
    });

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(false);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  test("Debe enviar un email con un archivo adjunto", async () => {
    mockSendEmail.mockResolvedValue("Email sent");

    const emailService = new EmailService({
      mailerHost: "smtp.example.com",
      mailerPort: 587,
      mailerUser: "user@example.com",
      senderEmailPassword: "password",
      postToProvider: true,
    });

    const attachments = [
      {
        filename: "test.txt",
        path: "./path/to/test.txt",
      },
    ];

    const sendEmailOptionsWithAttachment = {
      ...sendEmailOptions,
      attachments,
    };

    const result = await emailService.sendEmail(sendEmailOptionsWithAttachment);

    expect(result).toBe(true);
    expect(mockSendEmail).toHaveBeenCalledWith({
      from: sendEmailOptions.from,
      to: sendEmailOptions.to,
      subject: sendEmailOptions.subject,
      html: sendEmailOptions.htmlBody,
      attachments,
    });
  });
});
