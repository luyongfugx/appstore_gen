import { NextRequest } from "next/server";
import regPayApi from "@/aiboot_cloud/api/pay";
import { prismaClient } from "@/db/prisma";
const handler = async (
  req: NextRequest,
  { params }: { params: { slug: string[] } },
  res: Response
) => {
  const apiCreater = regPayApi(req, params);
  return apiCreater(req, res, params, prismaClient);
};

export { handler as GET, handler as POST };
