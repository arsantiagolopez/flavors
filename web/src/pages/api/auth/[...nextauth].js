import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { CustomMongoDbAdapter } from "../../../utils/CustomMongoDbAdapter";
import clientPromise from "../../../utils/mongodb";
import {
  generateSignupCode,
  sendMagicLink,
  sendSignupCode,
} from "../../../utils/sendEmail";

// Server & from fields for the email providers
const { server, from } = {
  server:
    process.env.NODE_ENV === "development"
      ? process.env.TEST_SERVER_STRING
      : // @todo: delete line below when app's finished
        // : process.env.SENGRID_SERVER_STRING,
        process.env.TEST_SERVER_STRING,
  from:
    process.env.NODE_ENV === "development"
      ? process.env.TEST_EMAIL_FROM
      : // @todo: delete line below when app's finished
        // : {
        //     email: process.env.SENDGRID_EMAIL_FROM,
        //     name: "Flavors",
        //   },
        process.env.TEST_EMAIL_FROM,
};

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      // Default email provider to log users in with a magic link
      EmailProvider({
        server,
        from,
        sendVerificationRequest: sendMagicLink,
      }),
      // Custom email provider to send registration code to email
      EmailProvider({
        id: "emailCode",
        name: "emailCode",
        type: "email",
        server,
        from,
        generateVerificationToken: generateSignupCode,
        sendVerificationRequest: sendSignupCode,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        profile(profile) {
          return {
            id: profile?.sub,
            name: profile?.name,
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            image: profile?.picture,
          };
        },
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        profile(profile) {
          const { id, name, picture, email } = profile || {};
          let [firstName, ...lastName] = name?.split(" ");
          lastName = lastName.join(" ");
          return {
            id,
            name,
            firstName,
            lastName,
            email,
            image: picture?.data?.url,
          };
        },
      }),
    ],
    // Custom Mongodb adapter
    adapter: CustomMongoDbAdapter({
      db: (await clientPromise).db("main"),
    }),
    secret: process.env.SECRET,
    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `jwt` is automatically set to `true` if no database is specified.
      jwt: false,
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60 * 24 * 30, // 1 month
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      updateAge: 60 * 60 * 24 * 30, // 1 month
    },
    theme: "dark",
    pages: {
      signIn: "/signin",
      error: "/signin",
      // newUser: "/new-user", // New users will be directed here on first sign in
    },
    // Cookies only accessible from HTTPS URLS
    useSecureCookies: process.env.NODE_ENV !== "development",
    // Apply cookie modifications only on production
    cookies: process.env.NODE_ENV !== "development" && {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
          domain: process.env.DOMAIN,
        },
      },
    },
    callbacks: {
      // Return userId on session
      async session({ session, user }) {
        return Promise.resolve({ ...session, user });
      },
    },
    // Debugging
    debug: true,
  });
}
