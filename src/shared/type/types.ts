import { type } from "os";

export type PICITEM = {
  id?: number;
  name?: string;
  img?: string;
  img2?: string;
  genImg?: string;
  type?: string;
  genDone?: boolean;
  checked?: boolean;
};
export type StylePackage = {
  name: string;
  images: Array<PICITEM>;
  checked?: boolean;
};
export type PAGEDATA = {
  currentPage?: number;
  total?: number;
};

export type SwapSample = {
  name: string;
  userImage: string;
  swapImages: Array<string>;
};
export type MoviesTvPicitems = {
  backdrops: PICITEM[];
  // logos: PICITEM[];
  posters: PICITEM[];
};
export type GroundSamMask = {
  box?: number[];
  label?: string;
  logit?: number;
  value?: number;
};

export enum DietType {
  BREAKFAST = 1,
  LUNCH = 2,
  DINNER = 3,
  SNACKS = 4,
  OTHER = 5,
}
export interface Food {
  id: string;
  // name: string;

  name: {
    en_name: string;
    zh_name: string;
  };
  unit: {
    en_unit: string;
    zh_unit: string;
  };
  count: number;
  calories: number;
  percent: number;
  // unit: string;
  calories_of_xg: number | string | undefined;
  protein: string;
  fat: string;
  carb: string;
  lang: string;
}

// a diet
export interface Diet {
  id: string;
  dTime: number;
  name: string;
  type: DietType;
  image: string;
  total_calories: number;
  total_protein: string;
  total_fat: string;
  total_carb: string;
  foods: Food[];
  // zh: Food[];
  diet_date?: string;
  clerk_sub?: string;
  created_at?: any;
  email?: string;
}

export interface MonthCount {
  id: string;
  diet_date?: string;
  clerk_sub?: string;
  month: string;
  calories: number;
  protein: number;
  fat: number;
  carb: number;
}

export const TmdbImagePath = "https://image.tmdb.org/t/p/original/";
