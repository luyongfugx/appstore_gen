import type { NextApiResponse } from "next";
import { prismaClient } from "@/db/prisma";
import moment from "moment";
import { Localization_Files } from "@prisma/client";

// const newFoods = async (diet: Diet, dietId) => {
//   const datas: any[] = [];
//   diet.foods.map((food: Food) => {
//     datas.push({
//       name: JSON.stringify(food.name),
//       lang: "",
//       diet_id: dietId,
//       count: food.count,
//       calories: food.calories,
//       unit: JSON.stringify(food.unit),
//       protein: food.protein,
//       percent: food.percent,
//       fat: food.fat,
//       carb: food.carb,
//       calories_of_xg: String(food!.calories_of_xg)!,
//     });
//   });

//   await prismaClient.food.createMany({ data: datas });
// };
// const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
const handler = async (req: Request, res: NextApiResponse) => {
  const lFile = await req.json();
  try {
    const result = {
      msg: "ok",
      status: 200,
      data: "succ",
    };
    const fileParam = {
      email: "luyongfugx@gmail.com",
      project_id: "1",
      ver: "1",
      json: lFile,
    };
    const nFile = await prismaClient.localization_Files.create({
      data: fileParam as any,
    });
    result.data = nFile!.id;
    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    const result = {
      msg: "error",
      status: 500,
      data: "error",
    };
    return new Response(JSON.stringify(result));
  }
};
// const getPrefixNumberFromString = (str: string) => {
//   const regex = /^[0-9.]+/;
//   const match = str.match(regex);
//   if (match && match[0]) {
//     return parseFloat(match[0]);
//   }
//   return null;
// };

// const updateMonth = async (
//   dietData: Diet,
//   month: string,
//   diet_date: string
// ) => {
//   const monthData = {
//     clerk_sub: dietData.clerk_sub,
//     month: month,
//     diet_date: diet_date,
//     calories: dietData.total_calories!,
//     protein: getPrefixNumberFromString(dietData.total_protein)!,
//     fat: getPrefixNumberFromString(dietData.total_fat)!,
//     carb: getPrefixNumberFromString(dietData.total_carb)!,
//   };
//   // console.log("monthData:", monthData);
//   const monthDiet = await prismaClient.month_Count.findFirst({
//     where: {
//       diet_date: diet_date!,
//       clerk_sub: dietData.clerk_sub,
//     },
//   });
//   // console.log("update month diet monthData:", monthData);
//   if (monthDiet) {
//     // console.log("monthData:", monthData);
//     monthDiet.calories = monthData.calories + monthDiet.calories;
//     monthDiet.protein = monthDiet.protein.add(monthData.protein);
//     monthDiet.fat = monthDiet.fat.add(monthData.fat);
//     monthDiet.carb = monthDiet.carb.add(monthData.carb);
//     // console.log("prismaClient.month_Count.updateMany:", monthDiet);
//     await prismaClient.month_Count.updateMany({
//       where: { month, diet_date },
//       data: monthDiet,
//     });
//     // already have, update
//   } else {
//     // console.log("monthData create :", monthData);
//     await prismaClient.month_Count.create({
//       data: monthData,
//     });
//   }
// };
// export default handler;
export { handler as GET, handler as POST };
