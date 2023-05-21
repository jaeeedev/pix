import { TItem } from "./product";

export type CartData = TItem & {
  count: number;
};
