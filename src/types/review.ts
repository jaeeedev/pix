import { DocumentData } from "firebase/firestore";

export type Review =
  | DocumentData
  | {
      createdAt: Date;
      productId: string;
      text: string;
      uid: string;
      writer: string;
    };
