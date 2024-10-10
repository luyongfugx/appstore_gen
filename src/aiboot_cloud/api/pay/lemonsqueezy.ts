import { LemonsqueezyClient } from "lemonsqueezy.ts";

export const nextLemonSqueezyProductsApiCreater = async function (
  req: any,
  res: any
) {
  const handler = async (request: Request) => {
    const reqJson = await request.json();
    const client = new LemonsqueezyClient(process.env.LEMONSQUEEZY_API_KEY!);
    //获取产品
    const products = await client.listAllProducts();
    // console.log("==============");
    // console.log(process.env.LEMONSQUEEZY_API_KEY);
    // console.log(reqJson);
    // console.log(JSON.stringify(products));
    return new Response(JSON.stringify(products));
  };
  return await handler(req);
};

export const nextLemonSqueezyIdApiCreater = async function (
  req: any,
  res: any,
  params: { slug: string[] }
) {
  const handler = async (request: Request) => {
    const client = new LemonsqueezyClient(process.env.LEMONSQUEEZY_API_KEY!);
    //获取产品
    const slug = params.slug;
    const productId = slug[2];
    const products = await client.retrieveProduct({
      id: productId,
    });
    return new Response(JSON.stringify(products.data));
  };
  return await handler(req);
};
