import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { CustomMongoDbAdapter } from "../../../utils/CustomMongoDbAdapter";
import clientPromise from "../../../utils/mongodb";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      /**
       * @todo Uncomment when new Sendgrid credentials
       **/
      // EmailProvider({
      //   server: {
      //     host: process.env.EMAIL_SERVER_HOST,
      //     port: process.env.EMAIL_SERVER_PORT,
      //     auth: {
      //       user: process.env.EMAIL_SERVER_USER,
      //       pass: process.env.EMAIL_SERVER_PASSWORD,
      //     },
      //   },
      //   from: process.env.EMAIL_FROM,
      //   // How long email links are valid for (default 24h)
      //   maxAge: 24 * 60 * 60,
      // }),
      // Google provider (Ready)
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
          lastName = last.join(" ");
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
      maxAge: 24 * 60 * 60, // 24 hours
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      updateAge: 24 * 60 * 60, // 24 hours
    },
    theme: "dark",
    pages: {
      signIn: "/signin",
      error: "/error",
      newUser: "/new-user", // New users will be directed here on first sign in
    },
    callbacks: {
      // Return userId on session
      async session({ session, user }) {
        return Promise.resolve({ ...session, user });
      },
    },
    // Cookies only accessible from HTTPS URLS
    useSecureCookies: process.env.NODE_ENV !== "development",
    // debug: true,
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
  });
}
