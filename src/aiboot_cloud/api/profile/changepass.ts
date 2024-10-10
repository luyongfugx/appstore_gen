import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { DefaultSession } from "next-auth";
export const nextChangePassApiCreater = async function (
  req: any,
  res: any,
  prismaClient: PrismaClient
) {
  const handler = async (req: Request) => {
    const body = (await req.json()) as any;
    const session = (await getServerSession()) as DefaultSession;
    const email = session.user?.email || "";
    const password = body.password;
    console.log(body);
    const hashed_password = await bcrypt.hash(password, 12);
    try {
      const user = await prismaClient.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashed_password,
        },
      });
      //return new Response(JSON.stringify("test"));
      return new Response(JSON.stringify(user));
    } catch (error: unknown) {
      console.log(error);
      return new Response("reg error: " + error, { status: 400 });
    }
  };
  return await handler(req);
};
