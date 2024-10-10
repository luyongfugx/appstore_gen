import { nextAuthRegCreater } from "./reg";
import { nextAuthCheckTokensCreater } from "./checkTokens";
import { nextAuthCreater } from "./nextauth";
import { NextRequest } from "next/server";

const regAuthApi = (req: NextRequest) => {
  let pay = req.nextUrl.pathname;
  const handers: Record<string, any> = {
    "/api/auth/reg": nextAuthRegCreater,
    "/api/auth/checkTokens": nextAuthCheckTokensCreater,
  };
  let apiCreater = handers[pay];
  if (!apiCreater) {
    apiCreater = nextAuthCreater;
  }
  return apiCreater;
};
export default regAuthApi;
