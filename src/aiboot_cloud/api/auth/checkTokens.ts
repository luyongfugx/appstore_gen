import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { DefaultSession } from "next-auth";
import { isTokensEnough } from "@/aiboot_cloud/utils/tokensUtil";
import { pricingConfig } from "@/config/pricing";

export const nextAuthCheckTokensCreater = async function (
  req: any,
  res: any,
  prismaClient: PrismaClient
) {
  const handler = async (req: Request, res: Response) => {
    const json = await req.json();
    const session = (await getServerSession()) as DefaultSession;
    try {
      const canGen = await isTokensEnough(
        session.user?.email!,
        json.consumptionType,
        prismaClient,
        pricingConfig
      );
      return new Response(JSON.stringify({ canGen: canGen }));
    } catch (error: unknown) {
      console.log(error);
      return new Response("reg error: " + error, { status: 400 });
    }
  };
  return await handler(req, res);
};
