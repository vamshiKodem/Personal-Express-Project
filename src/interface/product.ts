import { Document } from "mongoose";

type unit = "Pack" | "Kgs" | "Grams";

export interface Product extends Document {
  title: string;
  price: number;
  quantity: number;
  unit: unit;
  createdAt: Date;
}
