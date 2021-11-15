import sgMail from "@sendgrid/mail";

// Set the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email
const sendEmail = async ({ to, subject, html }) => {
  // Configure email
  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_EMAIL_FROM,
      name: "Flavors",
    },
    subject,
    html,
  };

  // Send email
  await sgMail.send(msg);
};

// Email HTML body
const htmlTemplate = ({ site, token }) => {
  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";

  return `
    <body style="background: ${backgroundColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            <strong>${site}</strong>
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Your code is <strong>${token}</strong>.
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
  `;
};

export { sendEmail, htmlTemplate };
