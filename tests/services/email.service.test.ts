import { EmailService } from '../../netlify/services';
import { envs } from '../../netlify/config/envs';

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

  const emailServiceOptions = {
    mailerHost: envs.MAILER_HOST,
    mailerPort: envs.MAILER_PORT,
    mailerUser: envs.MAILER_USER,
    senderEmailPassword: envs.MAILER_SECRET_KEY,
    postToProvider: true,
  };

  test("No debería enviar un email cuando 'postToProvider' es 'false'", async () => {
    const emailService = new EmailService({
      ...emailServiceOptions,
      postToProvider: false,
    });

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(true);
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  test("Debería enviar un email cuando 'postToProvider' es 'true'", async () => {
    // Hace que la funcion mock asincrona devuelva un valor al resolverse 
    mockSendEmail.mockResolvedValue("Email sent");

    const emailService = new EmailService(emailServiceOptions);

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(true);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  test("Debería manejar un error cuando falla el envío de un email", async () => {
    // Hace que la funcion mock asincrona devuelva un valor al rechazarse
    mockSendEmail.mockRejectedValue("Failed to send email");

    const emailService = new EmailService(emailServiceOptions);

    const result = await emailService.sendEmail(sendEmailOptions);

    expect(result).toBe(false);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  test("Debería enviar un email con un archivo adjunto", async () => {
    mockSendEmail.mockResolvedValue("Email sent");

    const emailService = new EmailService(emailServiceOptions);

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
