import type { NextApiResponse } from "next";
import { prismaClient } from "@/db/prisma";
import moment from "moment";
export interface DietParam {
  dTime?: number;
  id?: string;
}

const handler = async (req: Request, res: NextApiResponse) => {
  const fileList = await prismaClient.localization_Files.findMany({});
  // console.log(fileList);
  const result = {
    msg: "ok",
    status: 200,
    data: fileList,
  };
  return new Response(JSON.stringify(result));
};

// export default handler;
export { handler as GET, handler as POST };
