import { NextRequest } from "next/server";
import { prismaClient } from "@/db/prisma";
import regProfileApi from "@/aiboot_cloud/api/profile";
const handler = async (
  req: NextRequest,
  { params }: { params: { slug: string[] } },
  res: Response
) => {
  console.log(req.nextUrl.pathname);
  console.log(params);
  const apiCreater = regProfileApi(req, params);
  return apiCreater(req, params, prismaClient);
};
export { handler as GET, handler as POST };
