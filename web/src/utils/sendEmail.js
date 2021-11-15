import { createTransport } from "nodemailer";
import axios from "../axios";

/**
 * Generate random 6-digit code
 */
const generateSignupCode = async () => {
  const token = Math.floor(100000 + Math.random() * 900000);
  return token;
};

/**
 * Send test email with nodemailer.
 * @param {string} identifier - User's email.
 * @param {string} token - Numeric verification code.
 * @param {object} provider - Email server and from fields.
 */
const sendSignupCode = ({
  identifier: email,
  token,
  provider: { server, from },
}) => {
  return new Promise(async (resolve, reject) => {
    const site = "Flavors";

    // Check if email available
    const { data } = await axios.get("/api/user/email", {
      params: { email },
    });

    // Reject with email is already in use error
    if (!data?.success || !data?.available) {
      const { error } = data;
      return reject(new Error(error?.message));
    }

    // Track amount of requests & update tempUser
    const { data: codeData } = await axios.post("/api/user/code", {
      email,
      code: token,
    });

    // Reject with code request daily limit exceeded error
    if (!codeData?.success) {
      const { error } = codeData;
      return reject(new Error(error?.message));
    }

    // If no errors, send code to email
    const transport = createTransport(server);
    await transport.sendMail({
      to: email,
      from,
      subject: `Authentication code: ${token}`,
      text: codeText({ site, token }),
      html: codeHtml({ site, token }),
    });

    // // Configure email
    // const msg = {
    //   to,
    //   from: {
    //     email: process.env.SENDGRID_EMAIL_FROM,
    //     name: "Flavors",
    //   },
    //   subject,
    //   html,
    // };

    // // Send email
    // await sgMail.send(msg);
    return resolve();
  });
};

/**
 * Signup code HTML body
 */
const codeHtml = ({ site, token }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.

  // Some simple styling options
  const titleColor = "#EE1E38";
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const secondaryColor = "#E4E4E4";

  return `
    <body style="background: ${backgroundColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${titleColor};">
            <strong>${site}</strong>
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Your sign up code is <strong>${token}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${secondaryColor};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
  `;
};

/**
 * Code email Text body (fallback for email clients that don't
 * render HTML, e.g. feature phones)
 */
const codeText = ({ site, token }) =>
  `Sign in to ${site}\nYour code is ${token}\n\n`;

/**
 * Send test email with nodemailer.
 * @param {string} identifier - User's email.
 * @param {string} url - Url with encoded email and token.
 * @param {string} token - Numeric verification code.
 * @param {object} provider - Email server and from fields.
 */
const sendMagicLink = async ({
  identifier: email,
  url,
  token,
  provider: { server, from },
}) => {
  const { host } = new URL(url);
  const site = "Flavors";
  const transport = createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${site}`,
    text: magicText({ url, host }),
    html: magicHtml({ url, host, email, token }),
  });
};

/**
 * Magic link HTML body
 */
const magicHtml = ({ url, host, email }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#EE1E38";
  const buttonBorderColor = "#EE1E38";
  const buttonTextColor = "#ffffff";

  return `
    <body style="background: ${backgroundColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            <strong>${escapedHost}</strong>
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Sign in as <strong>${escapedEmail}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
              </tr>
            </table>
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

/**
 * Magic link email Text body (fallback for email clients that
 * don't render HTML, e.g. feature phones)
 */
const magicText = ({ url, host }) =>
  `Sign in to ${host}\n\nCopy and pasta this link!\n\n${url}\n\n`;

export { generateSignupCode, sendSignupCode, sendMagicLink };
