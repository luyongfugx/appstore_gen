import { Consumption, Prediction, Subscription } from ".prisma/client";
import { LemonsqueezyProduct } from "lemonsqueezy.ts/product";
import { DependencyList } from "react";

export enum ConsumptionType {
  chatgpt = 1,
  genImages = 2,
  training = 3,
}

export enum PAY_TYPE {
  ORDER = 0,
  SUBSCRIPTION = 1,
}
export enum ORDER_STATUS {
  PENDING = 0,
  PAID = 1,
  FAILED = 2,
  REFUNDED = 3,
}

export const ORDER_TXT_STATUS: Record<string, number> = {
  pending: ORDER_STATUS.PENDING,
  failed: ORDER_STATUS.FAILED,
  paid: ORDER_STATUS.PAID,
  refunded: ORDER_STATUS.REFUNDED,
};

export enum SUBSCRIPTION_STATUS {
  ONTRIAL = 0,
  ACTIVE = 1,
  PAUSED = 2,
  PASTDUE = 3,
  UNPAID = 4,
  CANCELED = 5,
  EXPIRED = 6,
}

export const SUBSCRIPTION_TXT_STATUS: Record<string, number> = {
  on_trial: SUBSCRIPTION_STATUS.ONTRIAL,
  active: SUBSCRIPTION_STATUS.ACTIVE,
  paused: SUBSCRIPTION_STATUS.PAUSED,
  past_due: SUBSCRIPTION_STATUS.PASTDUE,
  unpaid: SUBSCRIPTION_STATUS.UNPAID,
  cancelled: SUBSCRIPTION_STATUS.CANCELED,
  expired: SUBSCRIPTION_STATUS.EXPIRED,
};
/**
 * Shared types between the API and UI packages.
 */
export interface IPredictionPayload {
  version: string;
  input: any;
}
export interface IGPTPayload {
  prompt: string;
  provider?: string; // openai:Azure
  model: string;
  streaming?: boolean;
}
export interface ISamRequestPayload {
  inputImage: Blob;
  allMask?: boolean;
}

export interface UseOptions {
  api?: string;
  page?: number;
  onAuthRequired?: (response?: Response) => void;
  onPaymentRequired?: (response?: Response) => void;
  onError?: (error: Error) => void;
  deps: DependencyList;
}

export interface UseProfileOptions extends UseOptions {
  onFinish?: (profile: Profile) => void;
}

export interface UseCompletionOptions extends UseOptions {
  onFinish?: (prompt: string, completion: string) => void;
}

export interface UsePredictionOptions extends UseOptions {
  onFinish?: (payload?: IPredictionPayload, prediction?: Prediction) => void;
}

export interface UseLoraOptions extends UseOptions {
  onFinish?: (prediction?: Prediction) => void;
}
export interface UsePayOptions extends UseOptions {
  provider?: string;
  onFinish?: (storeId: string, products: LemonsqueezyProduct[]) => void;
}
export interface PricingInfo {
  subscription?: Subscription;
  product: LemonsqueezyProduct;
  price: any;
}
export interface PayPrice {
  id: string;
  name: string;
  tokens: number;
  genImages: number;
  training: number;
}
export interface UseSubInfo {
  canGenImages: number;
  genedImages: number;
  lastImages: number;
}
export interface PayConfig {
  provider: string;
  products: Record<string, PayPrice>;
}

export interface LineConfig {
  points?: number[];
  tool: string;
}
export interface KonvaStageProps {
  width: number;
  height: number;
  base64?: string;
  name: string;
  version: string;
  replicateConfig?: any;
}
export interface Profile {
  subscriptions?: Subscription[];
  consumptions?: Consumption[];
  predictions?: Prediction[];
  pricingInfos?: PricingInfo[];
  subInfo?: UseSubInfo;
}

export const contentStyle = {
  width: "90%",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 3,
};
