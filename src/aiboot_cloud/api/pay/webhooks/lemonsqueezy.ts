import crypto from "crypto";
import { listAllSubscriptions } from "lemonsqueezy.ts";
import {
  ORDER_STATUS,
  ORDER_TXT_STATUS,
  PAY_TYPE,
  SUBSCRIPTION_TXT_STATUS,
} from "@/aiboot_cloud/shared/type/types";
import { PrismaClient } from "@prisma/client";
type LemonsqueezySubscription = Awaited<
  ReturnType<typeof listAllSubscriptions>
>["data"][number];

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

// Add more events here if you want
// https://docs.lemonsqueezy.com/api/webhooks#event-types
type EventName =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_cancelled"
  | "subscription_updated"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_failed"
  | "subscription_payment_success"
  | "subscription_payment_recovered";

type Payload = {
  meta: {
    test_mode: boolean;
    event_name: EventName;
  };
  // Possibly not accurate: it's missing the relationships field and any custom data you add
  data: LemonsqueezySubscription;
};

export const nextLemonSqueezyWebHookCreater = async function (
  req: any,
  res: any,
  params: { slug: string[] },
  prismaClient: PrismaClient
) {
  const handler = async (request: Request) => {
    try {
      // console.log("before request:", request);
      const rawBody = await request.text();
      // console.log("rawBody:" + rawBody);
      const hmac = crypto.createHmac(
        "sha256",
        process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ""
      );
      const digest = Buffer.from(
        hmac.update(Buffer.from(rawBody)).digest("hex"),
        "utf8"
      );
      // console.log("after request:", request);
      // console.log("after request headers:", request.headers);
      const signatureh = request.headers.get("x-signature");
      //console.log("signature:" + signatureh);
      const signature = Buffer.from(signatureh || "", "utf8");
      if (!crypto.timingSafeEqual(digest, signature)) {
        return new Response("Invalid signature", { status: 400 });
      }

      const payload = await JSON.parse(rawBody);
      const {
        meta: { event_name: eventName },
        data: subscription,
      } = payload as Payload;
      //console.log("after payload:", payload);
      // create :  data.id:77116 orderid:850445
      // updated:data.id 77116 orderid:850445
      // payment_succ:data.id 112236  subscription_id:77116 ,no order_id
      // cancel:data.id 77116   "order_id": 850445,
      switch (eventName) {
        // case "order_created":
        //   console.log("order_created call");
        //   // Do stuff here if you are using orders
        //   break;
        case "order_refunded":
          // Do stuff here if you are using orders
          break;

        case "subscription_resumed":
        case "subscription_expired":
        case "subscription_paused":
        case "subscription_unpaused":
        case "subscription_payment_recovered":
        case "subscription_payment_failed":
          break;
        case "subscription_cancelled":
          const pfData = await prismaClient.subscription.update({
            where: {
              subscriptionId: payload.data.id,
            },
            data: {
              subscriptionStatus: SUBSCRIPTION_TXT_STATUS.REFUNDED,
            },
          });
          return new Response(JSON.stringify(pfData), { status: 200 });
        //  break;
        case "subscription_payment_success":
          const payData = await prismaClient.subscription.update({
            where: {
              subscriptionId: "" + payload.data.attributes.subscription_id,
            },
            data: {
              subscriptionStatus: SUBSCRIPTION_TXT_STATUS.PAID,
            },
          });
          return new Response(JSON.stringify(payData), { status: 200 });
        //  break;
        case "order_created":
          const attributes = payload.data.attributes;
          const orderData = await prismaClient.subscription.create({
            data: {
              email: attributes.user_email,
              productId: attributes.first_order_item.product_id,
              productName: attributes.first_order_item.product_name,
              orderItemId: attributes.order_item_id,
              customerId: attributes.customer_id,
              storeId: attributes.store_id,
              subscriptionId: payload.data.id, //here use orderid first,if a one pay order ,might be no subscriptionId
              orderId: payload.data.id,
              variantId: attributes.variant_id,
              currentPeriodEnd: attributes.renews_at,
              createdAt: attributes.created_at,
              orderStatus: ORDER_TXT_STATUS[attributes.status],
              type: PAY_TYPE.ORDER,
              provider: "lemonsqueezy",
            },
          });
          // console.log(subscripionData);
          return new Response(JSON.stringify(orderData), {
            status: 200,
          });
        case "subscription_created":
          const atts = payload.data.attributes;
          const orderId = atts.order_id;
          let subscripionData = await prismaClient.subscription.findFirst({
            where: {
              orderId: orderId,
            },
          });
          if (subscripionData) {
            subscripionData.subscriptionId = payload.data.id;
            subscripionData.subscriptionStatus =
              SUBSCRIPTION_TXT_STATUS[atts.status];
            subscripionData.type = PAY_TYPE.SUBSCRIPTION;
            await prismaClient.subscription.update({
              where: {
                id: subscripionData.id,
              },
              data: subscripionData,
            });
          }
          return new Response(JSON.stringify(subscripionData), { status: 200 });
        default:
          throw new Error(`🤷‍♀️ Unhandled event: ${eventName}`);
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (isError(error)) {
        return new Response("Webhook error : " + error, { status: 400 });
      }
      return new Response("Webhook: unknown error" + error, { status: 400 });
    }
  };
  return await handler(req);
};
