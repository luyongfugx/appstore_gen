import { Session } from "next-auth";
import {
  ConsumptionType,
  ORDER_STATUS,
  PAY_TYPE,
  PayConfig,
  SUBSCRIPTION_STATUS,
} from "@/aiboot_cloud/shared/type/types";
import { PrismaClient } from ".prisma/client";

export const isFreeConsumption = async (
  email: string,
  type: ConsumptionType,
  prismaClient: PrismaClient
) => {
  const consumptionData = await prismaClient.free_Consumption.groupBy({
    by: ["email"],
    where: {
      email: email,
      type: type,
    },
    _sum: {
      consum_count: true,
    },
  });
  let consum_count = 0;
  if (consumptionData && consumptionData.length > 0) {
    const consumData = consumptionData[0];
    console.log(consumData._sum.consum_count);
    consum_count = consum_count + consumData._sum!.consum_count!;
    console.log("consumData._sum.consum_count " + consum_count);
  }
  if (consum_count < 2) {
    return true;
  } else {
    return false;
  }
};
export const isTokensEnough = async (
  email: string,
  type: ConsumptionType,
  prismaClient: PrismaClient,
  pricingConfig: PayConfig
) => {
  // const email = session?.user?.email!;
  const now = new Date().toISOString();
  // get your active or on-trial subscription
  let subscriptions = await prismaClient.subscription.findMany({
    where: {
      OR: [
        {
          subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
        },
        { subscriptionStatus: SUBSCRIPTION_STATUS.ONTRIAL },
      ],
      email: email,
      type: PAY_TYPE.SUBSCRIPTION,
      currentPeriodEnd: {
        gte: now,
      },
    },
  });

  // get your paid order
  let orders = await prismaClient.subscription.findMany({
    where: {
      email: email,
      orderStatus: ORDER_STATUS.PAID,
      type: PAY_TYPE.ORDER,
    },
  });

  subscriptions = subscriptions.concat(orders);
  // if (!subscriptions || subscriptions.length <= 0) {
  if (!subscriptions || subscriptions.length <= 0) {
    return false;
  }
  let consum_count = 0;
  console.log("subscriptions:", subscriptions);
  //get your consumption
  await Promise.all(
    subscriptions.map(async (subscription) => {
      let consumptionData;
      if (subscription.type == PAY_TYPE.SUBSCRIPTION) {
        consumptionData = await prismaClient.consumption.groupBy({
          by: ["email"],
          where: {
            email: email,
            type: type,
            created_at: {
              lte: subscription.currentPeriodEnd!, // "2022-01-30T00:00:00.000Z"
              gte: subscription.createdAt!, // "2022-01-15T00:00:00.000Z"
            },
          },
          _sum: {
            consum_count: true,
          },
        });
      } else if (subscription.type == PAY_TYPE.ORDER) {
        consumptionData = await prismaClient.consumption.groupBy({
          by: ["email"],
          where: {
            email: email,
            type: type,
          },
          _sum: {
            consum_count: true,
          },
        });
      }

      if (consumptionData && consumptionData.length > 0) {
        const consumData = consumptionData[0];
        console.log(consumData._sum.consum_count);
        consum_count = consum_count + consumData._sum!.consum_count!;
        console.log("consumData._sum.consum_count " + consum_count);
      }
    })
  );
  console.log("total consum_count:" + consum_count);
  let totol_can_consum = 0;
  //count your subscription tokens
  subscriptions.map(async (subscription) => {
    const productId = "" + subscription?.productId;
    const item = pricingConfig.products[productId];
    if (ConsumptionType.chatgpt == type) {
      totol_can_consum += item.tokens;
    } else if (ConsumptionType.genImages == type) {
      totol_can_consum += item.genImages;
    } else if (ConsumptionType.training == type) {
      totol_can_consum += item.training;
    }
  });
  console.log("totol can consum:" + totol_can_consum);
  if (totol_can_consum + 2 >= consum_count) {
    // can generate two
    // if (totol_can_consum >= consum_count) {
    // can do
    console.log(
      "totol can consum:" +
        totol_can_consum +
        " > consum_count:" +
        consum_count +
        " can do!"
    );
    return true;
  } else {
    console.log(
      "totol can consum:" +
        totol_can_consum +
        " < consum_count:" +
        consum_count +
        " can not do!"
    );
    return false;
  }
  // get the user Consumption fornow
};
