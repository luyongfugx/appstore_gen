import * as bcrypt from "bcrypt";
import { createHash } from "crypto";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { sendRegEmail } from "@/aiboot_cloud/emailTmpl/emailUtils";
const hashToken = (token: string, secret: string) => {
  return createHash("sha256").update(`${token}${secret}`).digest("hex");
};
export const nextAuthRegCreater = async function (
  req: any,
  res: any,
  prismaClient: PrismaClient
) {
  const handler = async (req: Request, res: Response) => {
    const body = (await req.json()) as any;
    const email = body.email;
    const password = body.password;
    const hashed_password = await bcrypt.hash(password, 12);
    try {
      const user = await prismaClient.user.create({
        data: {
          email: email,
          image: "user.svg",
          name: email,
          password: hashed_password,
        },
      });
      const provider = EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || "0"),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      });
      provider.from = provider.options.from;
      provider.server = provider.options.server!;
      const secret = provider.secret ?? process.env.NEXTAUTH_SECRET;
      const sendVerifyToken = hashToken(
        randomBytes(32).toString("hex"),
        secret || ""
      );
      const ONE_DAY_IN_SECONDS = 86400;
      const expires = new Date(
        Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000
      );
      const callbackUrl = encodeURIComponent(
        process.env.NEXTAUTH_URL + "/auth/signin"
      );
      const url =
        process.env.NEXTAUTH_URL +
        "/api/auth/callback/email?callbackUrl=" +
        callbackUrl +
        "&token=" +
        sendVerifyToken +
        "&email=" +
        encodeURIComponent(email);
      // await sendRegEmail({ url: url, identifier: email, provider: provider });
      const adapter = PrismaAdapter(prismaClient);
      if (adapter.createVerificationToken) {
        const dbToken = hashToken(sendVerifyToken, secret || "");
        await adapter?.createVerificationToken({
          identifier: email,
          expires: expires,
          token: dbToken,
        });
      }
      //return new Response(JSON.stringify("test"));
      return new Response(JSON.stringify(user));
    } catch (error: unknown) {
      console.log(error);
      return new Response("reg error: " + error, { status: 400 });
    }
  };
  return await handler(req, res);
};
