import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from "cookies-next";
import { prismaClient } from "@/db/prisma";

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};
const adapter = PrismaAdapter(prismaClient);
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  // Configure one or more authentication providers
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {},
    //   async authorize(credentials) {
    //     try {
    //       const cRecord = credentials as Record<string, any>;
    //       const email = cRecord!["email"];
    //       const password = cRecord!["password"];
    //       const user = await prismaClient.user.findFirst({
    //         where: { email: email },
    //       });
    //       if (!user || !user.emailVerified) {
    //         //not verified can not login
    //         // throw new Error('No user found with this credential')
    //         throw new Error(
    //           JSON.stringify({
    //             errors: "No user found with this credential",
    //             status: false,
    //           })
    //         );
    //       }
    //       const checkPassword = bcrypt.compareSync(
    //         password,
    //         user?.password || ""
    //       );

    //       if (!checkPassword) {
    //         throw new Error("Password doesnt match");
    //       }

    //       const userAccount = {
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         image: "user.svg",
    //       };
    //       return userAccount;
    //     } catch (e) {
    //       return null;
    //     }
    //   },
    // }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: parseInt(process.env.EMAIL_SERVER_PORT || "0"),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: sendVerificationRequest,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),

    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: adapter as any,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if (
      //   req.nextUrl.pathname === "/api/auth/callback/credentials" &&
      //   req.method === "POST"
      // ) {
      //   if (user) {
      //     const sessionToken = uuidv4();
      //     const sessionMaxAge = 60 * 60 * 24 * 30; //30Days
      //     const sessionExpiry = fromDate(sessionMaxAge); //
      //     if (adapter && adapter.createSession) {
      //       await adapter.createSession({
      //         sessionToken: sessionToken,
      //         userId: user.id,
      //         expires: sessionExpiry,
      //       });
      //     }

      //     setCookie("next-auth.session-token", sessionToken, {
      //       expires: sessionExpiry,
      //     });
      //   }
      // }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};

export const nextAuthCreater = async function (req: any, res: any) {
  authOptions.callbacks = {
    async signIn({ user, account, profile, email, credentials }) {
      if (
        req.nextUrl.pathname === "/api/auth/callback/credentials" &&
        req.method === "POST"
      ) {
        if (user) {
          const sessionToken = uuidv4();
          const sessionMaxAge = 60 * 60 * 24 * 30; //30Days
          const sessionExpiry = fromDate(sessionMaxAge); //
          if (adapter && adapter.createSession) {
            await adapter.createSession({
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            });
          }

          setCookie("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
          });
        }
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  };
  //const handler = async function(req: any, res: any) {
  // const nextreq = req as NextApiRequest
  return await NextAuth(req, res, authOptions);
  //  }
  // return handler;
};

// export { handler as GET, handler as POST };
