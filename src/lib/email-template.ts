function generateCalendarLink(): string {
  // Google Calendar link for March 27, 2026
  const startDate = '20260327T120000'; // March 27, 2026, 12:00 PM
  const endDate = '20260327T180000'; // March 27, 2026, 6:00 PM
  const title = encodeURIComponent('Wedding: Oluwadoyinsolami & Oluwaseyi');
  const details = encodeURIComponent('You are cordially invited to celebrate the wedding of Oluwadoyinsolami & Oluwaseyi');
  const location = encodeURIComponent('Toronto, Canada');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

function generateDirectionsLink(): string {
  const location = encodeURIComponent('Toronto, Canada');
  return `https://www.google.com/maps/search/?api=1&query=${location}`;
}

function generateMessageHostsLink(): string {
  // Generate mailto link for contacting hosts
  const email = 'jshbakare@gmail.com';
  const subject = encodeURIComponent('Wedding Inquiry - Oluwadoyinsolami & Oluwaseyi');
  return `mailto:${email}?subject=${subject}`;
}

export function getInvitationEmailTemplate(
  invitationLink: string,
  baseUrl: string,
  recipientName?: string
): string {
  const coupleImageUrl = `${baseUrl}/assets/images/groom-kissing-bride.png`;
  const heroImageUrl = `${baseUrl}/assets/images/hero-img.png`;
  const gifUrl = `${baseUrl}/assets/gif/email-gf.gif`;
  const calendarLink = generateCalendarLink();
  const directionsLink = generateDirectionsLink();
  const messageHostsLink = generateMessageHostsLink();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Wedding Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #f5f0e8; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <!-- Main Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f0e8;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Email Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #faf8f3; border-radius: 0; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); border: 1px solid #e8e0d5;">
          
          <!-- Elegant Top Border -->
          <tr>
            <td style="background: linear-gradient(90deg, transparent 0%, #d4af37 20%, #d4af37 80%, transparent 100%); height: 3px; padding: 0;"></td>
          </tr>

          <!-- Couple Image Section - Prominent at Top -->
          <tr>
            <td style="background-color: #faf8f3; padding: 50px 40px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="${coupleImageUrl}" alt="Oluwadoyinsolami & Oluwaseyi" width="320" height="auto" style="display: block; max-width: 320px; height: auto; border-radius: 4px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15); border: 3px solid #d4af37;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 40px; background-color: #faf8f3;">
              <!-- Elegant Gold Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 35px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="120">
                      <tr>
                        <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Couple Names -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 25px;">
                    <h1 style="margin: 0; font-family: Georgia, serif; font-size: 44px; font-weight: normal; color: #2c2416; line-height: 1.3; letter-spacing: 3px;">
                      Oluwadoyinsolami<br>
                      <span style="font-size: 28px; color: #d4af37; font-weight: normal; letter-spacing: 2px;">&</span><br>
                      Oluwaseyi
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Elegant Gold Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 35px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="120">
                      <tr>
                        <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Invitation Text -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 45px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 19px; color: #5a4a3a; line-height: 1.8; font-style: italic; letter-spacing: 0.5px;">
                      You are cordially invited to celebrate<br>
                      our special day
                    </p>
                  </td>
                </tr>
              </table>

              <!-- GIF Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 45px;">
                    <img src="${gifUrl}" alt="Wedding Celebration" width="520" height="auto" style="display: block; max-width: 520px; width: 100%; height: auto; border-radius: 4px;" />
                  </td>
                </tr>
              </table>

              <!-- Date and Location -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 18px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #2c2416; font-weight: normal; letter-spacing: 2px;">
                      Friday
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 36px; color: #d4af37; font-weight: normal; letter-spacing: 3px;">
                      March 27, 2026
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 45px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 21px; color: #8b7355; font-style: italic; letter-spacing: 1px;">
                      Toronto, Canada
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Elegant Gold Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 45px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="120">
                      <tr>
                        <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button with Gold Accent -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 50px;">
                    <a href="${invitationLink}" style="display: inline-block; padding: 18px 50px; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #ffffff; text-decoration: none; border-radius: 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; letter-spacing: 2px; box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4); border: 2px solid #d4af37;">
                      RSVP NOW
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Additional Information -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 15px; color: #8b7355; line-height: 1.8; font-style: italic;">
                      Keep this email for reference. It includes important<br>
                      information about this event.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Elegant Gold Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100">
                      <tr>
                        <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons with Gold Accents -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 15px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 0 6px;">
                          <a href="${calendarLink}" style="display: inline-block; padding: 12px 24px; background-color: #faf8f3; color: #2c2416; text-decoration: none; border-radius: 0; font-family: Georgia, serif; font-size: 14px; border: 1px solid #d4af37; letter-spacing: 0.5px;">
                            📅 Add To Calendar
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="${directionsLink}" style="display: inline-block; padding: 12px 24px; background-color: #faf8f3; color: #2c2416; text-decoration: none; border-radius: 0; font-family: Georgia, serif; font-size: 14px; border: 1px solid #d4af37; letter-spacing: 0.5px;">
                            🗺️ Get Directions
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <a href="${messageHostsLink}" style="display: inline-block; padding: 12px 24px; background-color: #faf8f3; color: #2c2416; text-decoration: none; border-radius: 0; font-family: Georgia, serif; font-size: 14px; border: 1px solid #d4af37; letter-spacing: 0.5px;">
                      💌 Message The Hosts
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Elegant Gold Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100">
                      <tr>
                        <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Full Invitation Link -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 25px; background-color: #f5f0e8; border: 1px solid #e8e0d5;">
                    <p style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 13px; color: #8b7355; font-weight: normal; letter-spacing: 0.5px;">
                      Your Personal Invitation Link:
                    </p>
                    <p style="margin: 0; font-family: 'Courier New', monospace; font-size: 11px; color: #2c2416; word-break: break-all; line-height: 1.6;">
                      <a href="${invitationLink}" style="color: #d4af37; text-decoration: underline;">
                        ${invitationLink}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Elegant Bottom Border -->
          <tr>
            <td style="background: linear-gradient(90deg, transparent 0%, #d4af37 20%, #d4af37 80%, transparent 100%); height: 3px; padding: 0;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 50px 40px 60px; background-color: #faf8f3; border-top: 1px solid #e8e0d5;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 32px; color: #d4af37; line-height: 1.4;">
                      💕
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 18px; color: #5a4a3a; line-height: 1.8; font-style: italic; letter-spacing: 0.5px;">
                      We cannot wait to celebrate<br>
                      this special day with you
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 16px; color: #8b7355; line-height: 1.8; letter-spacing: 1px;">
                      With love,<br>
                      <span style="color: #d4af37; font-size: 18px;">Oluwadoyinsolami & Oluwaseyi</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

