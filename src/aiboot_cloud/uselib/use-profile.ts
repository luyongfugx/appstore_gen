"use client";
import {
  PricingInfo,
  Profile,
  UseProfileOptions,
  UseSubInfo,
} from "@/aiboot_cloud/shared/type/types";
import { useCallback, useState } from "react";
import { pricingConfig } from "@/config/pricing";
import { Subscription } from ".prisma/client";
import { LemonsqueezyProduct } from "lemonsqueezy.ts/product";
import doFetch from "./do-fetch";
export type UserProfileHelpers = {
  profile?: Profile;
  start: () => void;
  isLoading: boolean;
};
const getPemonsqueezyProductById = async (id: string) => {
  const api = "/api/pay/lemonsqueezy/id/" + id;
  try {
    const response = await doFetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let product: LemonsqueezyProduct = await response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};
export const changePass = async (password: string) => {
  const changePassApi = "/api/profile/changepass";
  try {
    const response = await doFetch(changePassApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const user = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export function UserProfile({
  api = "/api/profile/profile",
  onFinish,
  onError,
  deps,
}: UseProfileOptions): UserProfileHelpers {
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const start = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await doFetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let profile: Profile = await response.json();
      //   let tpricingInfos: PricingInfo[] = [];
      let subInfo: UseSubInfo = {
        canGenImages: 0,
        genedImages: 0,
        lastImages: 0,
      };
      const tpricingInfos: PricingInfo[] = await Promise.all(
        profile.subscriptions!.map(async (sub: Subscription) => {
          const productId = sub.productId! as unknown as string;
          const products = pricingConfig.products as Record<string, any>;
          const itemPrice = products[productId!];
          subInfo.canGenImages = subInfo.canGenImages + itemPrice.genImages;
          const lemonsqueezyProduct = await getPemonsqueezyProductById(
            productId!
          );
          return {
            subscription: sub,
            product: lemonsqueezyProduct!,
            price: itemPrice,
          };
        })
      );

      profile.consumptions!.map((ct) => {
        subInfo.genedImages = subInfo.genedImages + ct?.consum_count!;
      });
      subInfo.lastImages = subInfo.canGenImages - subInfo.genedImages;
      profile.subInfo = subInfo;
      profile.pricingInfos = tpricingInfos;
      if (!response.ok) {
        if (onError) {
          onError(new Error("response error"));
        }
      } else {
        if (onFinish) {
          onFinish(profile);
        }
      }
      setProfile(profile);
      setIsLoading(false);
    } catch (error) {
      if (onError) {
        onError(new Error(error as string));
      }
      setIsLoading(false);
    }
  }, [...deps]);

  return {
    profile,
    start,
    isLoading,
  };
}
