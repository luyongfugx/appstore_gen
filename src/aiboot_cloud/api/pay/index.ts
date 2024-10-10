import { NextRequest } from "next/server";
import {
  nextLemonSqueezyProductsApiCreater,
  nextLemonSqueezyIdApiCreater,
} from "./lemonsqueezy";
import { nextPayPaLApiCreater } from "./paypal";
import { nextLemonSqueezyWebHookCreater } from "./webhooks/lemonsqueezy";

const regPayApi = (req: NextRequest, params: { slug: string[] }) => {
  let pathname = req.nextUrl.pathname;
  const handers: Record<string, any> = {
    "/api/pay/lemonsqueezy/products": nextLemonSqueezyProductsApiCreater,
    "/api/pay/lemonsqueezy/id/.+?": nextLemonSqueezyIdApiCreater,
    "/api/pay/paypal": nextPayPaLApiCreater,
    "/api/pay/webhook/lemonsqueezy": nextLemonSqueezyWebHookCreater,
  };

  for (const key in handers) {
    const apiCreater = handers[key];
    const regexp = new RegExp(key);
    const test = regexp.test(pathname);
    if (test) {
      // console.log(key + " " + pathname + " test right");
      return apiCreater;
    }
  }
};
export default regPayApi;
