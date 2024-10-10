import { NextRequest } from "next/server";
import { nextAuthCreater } from "@/aiboot_cloud/api/auth/nextauth";

const handler = async (req: NextRequest, res: Response) => {
  const nextAuth = nextAuthCreater(req, res);
  return nextAuth;
};

export { handler as GET, handler as POST };
