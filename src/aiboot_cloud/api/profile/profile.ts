import { PrismaClient } from "@prisma/client";
import { Profile } from "@/aiboot_cloud/shared/type/types";
import { getServerSession } from "next-auth/next";
import { DefaultSession } from "next-auth";

export const nextProfileApiCreater = async function (
  req: any,
  res: any,
  prismaClient: PrismaClient
) {
  const handler = async (req: Request) => {
    const session = (await getServerSession()) as DefaultSession;
    const email = session.user?.email || "";
    try {
      const subcriptions = await prismaClient.subscription.findMany({
        where: {
          email: email,
        },
      });

      const consumptions = await prismaClient.consumption.findMany({
        where: {
          email: email,
        },
      });
      const predictions = await prismaClient.prediction.findMany({
        where: {
          email: email,
        },
      });
      const profile: Profile = {
        subscriptions: subcriptions,
        consumptions: consumptions,
        predictions: predictions,
      };
      //return new Response(JSON.stringify("test"));
      return new Response(JSON.stringify(profile));
    } catch (error: unknown) {
      console.log(error);
      return new Response("reg error: " + error, { status: 400 });
    }
  };

  return await handler(req);
};
