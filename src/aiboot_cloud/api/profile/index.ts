import { NextRequest } from "next/server";
import { nextChangePassApiCreater } from "./changepass";
import { nextProfileApiCreater } from "./profile";

const regProfileApi = (req: NextRequest, params: { slug: string[] }) => {
  let path = req.nextUrl.pathname;
  console.log("regProfileApi:" + path);
  const handers: Record<string, any> = {
    "/api/profile/profile": nextProfileApiCreater,
    "/api/profile/changepass": nextChangePassApiCreater,
  };
  const apiCreater = handers[path];
  return apiCreater;
};
export default regProfileApi;
