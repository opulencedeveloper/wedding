import nodemailer from 'nodemailer';
import { getInvitationEmailTemplate } from './email-template';

export async function sendInvitationEmail(
  to: string,
  invitationLink: string,
  baseUrl: string
): Promise<void> {
  // Gmail SMTP configuration - requires App Password
  // Get Gmail credentials from environment variables
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || '';
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD || '';

  // Validate Gmail configuration
  if (!gmailUser || !gmailAppPassword) {
    console.error('Gmail configuration is missing. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.');
    throw new Error('Gmail configuration is missing. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.');
  }

  // Validate that user is a Gmail address
  if (!gmailUser.includes('@gmail.com') && !gmailUser.includes('@googlemail.com')) {
    throw new Error('Gmail user must be a Gmail address (e.g., yourname@gmail.com)');
  }

  // Create Gmail transporter with nodemailer
  // Using port 587 with TLS (secure: false) - recommended for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: gmailUser,
      pass: gmailAppPassword, // Gmail App Password (not regular password)
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Generate email HTML
  const htmlContent = getInvitationEmailTemplate(invitationLink, baseUrl);

  // Email options
  const mailOptions = {
    from: `"Oluwadoyinsolami & Oluwaseyi" <${gmailUser}>`,
    replyTo: 'jshbakare@gmail.com',
    to: to,
    subject: 'You\'re Invited! 🎉 Wedding Invitation - Oluwadoyinsolami & Oluwaseyi',
    html: htmlContent,
    text: `You are cordially invited to celebrate the wedding of Oluwadoyinsolami & Oluwaseyi on Friday, March 27, 2026 in Toronto, Canada.\n\nYour personal invitation link: ${invitationLink}\n\nPlease RSVP using the link above.`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Invitation email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw error;
  }
}

