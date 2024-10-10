"use client";
import { LemonsqueezyProduct } from "lemonsqueezy.ts/product";
import {
  PayConfig,
  PricingInfo,
  UsePayOptions,
} from "@/aiboot_cloud/shared/type/types";
import { useCallback, useState } from "react";
import doFetch from "./do-fetch";
export type UserPayHelpers = {
  pricingInfos: PricingInfo[];
  start: (storeId: string, pricingConfig: PayConfig) => void;
  isLoading: boolean;
};
export function UserPay({
  api = "/api/pay/",
  provider = "lemonsqueezy",
  onFinish,
  onError,
  deps,
}: UsePayOptions): UserPayHelpers {
  const [pricingInfos, setPricingInfos] = useState<PricingInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const start = useCallback(
    async (storeId: string, pricingConfig: PayConfig) => {
      setIsLoading(true);
      try {
        const response = await doFetch(api + provider + "/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ storeId: storeId }),
        });

        let products = await response.json();
        console.log(products);
        if (!response.ok) {
          if (onError) {
            onError(new Error("response error"));
          }
        } else {
          if (onFinish) {
            onFinish(storeId, products);
          }
          const tpricingInfos: PricingInfo[] = [];
          products.data.map((lemonsqueezyProduct: LemonsqueezyProduct) => {
            const itemPrice = pricingConfig.products[lemonsqueezyProduct.id];
            tpricingInfos.push({
              product: lemonsqueezyProduct!,
              price: itemPrice,
            });
            setPricingInfos(tpricingInfos);
          });
        }
        setIsLoading(false);
      } catch (e) {
        if (onError) {
          onError(new Error(e as string));
        }
        setIsLoading(false);
      }
    },
    [api, onError, onFinish, ...deps]
  );

  return {
    start,
    isLoading,
    pricingInfos,
  };
}
