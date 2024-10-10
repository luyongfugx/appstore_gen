export const nextPayPaLApiCreater = async function (req: any, res: any) {
  const handler = async (request: Request) => {
    return new Response(JSON.stringify([]));
  };
  return await handler(req);
};
