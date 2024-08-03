import { Timestamp } from "firebase/firestore";

export type ICoupon = {
  code: string,
  discount: 0,
  expiresAt: string,
  singleUse: false,
  usedCount: number
  usedBy?: UsedBy[];
};


export interface UsedBy {
  userEmail: string;
  used_at: Timestamp;
}

