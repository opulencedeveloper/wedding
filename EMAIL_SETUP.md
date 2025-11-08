# Email Setup Guide

This guide will help you configure Gmail email sending for the wedding invitation system.

**Note:** This system is configured to use **Gmail only** with nodemailer SMTP and App Password authentication.

## Installation

First, install the required dependencies:

```bash
npm install nodemailer @types/nodemailer
```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Base URL for the application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Gmail Configuration (Required)
# Use GMAIL_USER and GMAIL_APP_PASSWORD (preferred)
# Or fallback to SMTP_USER and SMTP_PASSWORD for backward compatibility
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Alternative (backward compatible)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
```

## Gmail App Password Setup

This system **requires** a Gmail App Password (not your regular Gmail password). Follow these steps:

1. **Enable 2-Factor Authentication** on your Google account:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to **Security** → **2-Step Verification**
   - Follow the prompts to enable 2FA

2. **Generate an App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to **Security** → **2-Step Verification** → **App passwords**
   - Select "Mail" as the app and "Other (Custom name)" as the device
   - Enter a name like "Wedding Website" and click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
   - Use this app password as your `GMAIL_APP_PASSWORD` (remove spaces)

3. **Important Notes**:
   - The App Password is a 16-character code (no spaces)
   - You cannot use your regular Gmail password
   - The email address must be a Gmail address (@gmail.com or @googlemail.com)
   - App Passwords are required for Gmail accounts with 2FA enabled

## Testing

After setting up your environment variables, test the email functionality by generating an invitation link through the admin panel. The email will be sent automatically when a new invitation link is created.

## Gmail SMTP Configuration

The system uses the following Gmail SMTP settings (hardcoded):
- **Service**: Gmail
- **Host**: smtp.gmail.com
- **Port**: 587 (TLS)
- **Secure**: false (TLS is used)
- **Authentication**: Gmail App Password required

## Troubleshooting

- **"Gmail configuration is missing"**: Make sure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in your `.env.local`
- **"Gmail user must be a Gmail address"**: Ensure your email ends with `@gmail.com` or `@googlemail.com`
- **Authentication failed**: 
  - Verify you're using an App Password (16 characters), not your regular Gmail password
  - Make sure 2FA is enabled on your Google account
  - Regenerate the App Password if needed
- **"Less secure app access" error**: This shouldn't happen with App Passwords, but if it does, ensure 2FA and App Passwords are properly configured
- **Connection timeout**: Check your internet connection and firewall settings
- **Emails not received**: Check spam folder and verify the recipient email address

## Notes

- **Email is sent BEFORE document creation**: If email fails, no registration document will be created
- Email errors are logged to the console for debugging
- The email template uses images from your public assets folder, so make sure the base URL is correct
- Reply-to address is set to: `jshbakare@gmail.com`

