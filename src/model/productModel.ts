import { Schema, model } from "mongoose";
import Joi from "joi";

import { Product } from "../interface/product";

const productSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
      min: 3,
      max: 50,
      unique: true,
      // match: Regular expression
      // lowercase: true,
      // uppercase: true
      // trim: true,
    },
    price: {
      type: Number,
      required: true,
      // When we set (Create or Update) price this set method is called
      set: (v: number) => Math.round(v),
      // When we get (Retrieve) price this getter method is called
      get: (v: number) => Math.floor(v),
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity should be more than 1"],
      // Customer Validator
      validate: {
        validator: function (v: number) {
          return v && v > 0;
        },
        message: (props: any) => `${props.value} should more than 1`,
      },
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["Pack", "Kgs", "Grams"],
        message: `Given value is not supported`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<Product>("Product", productSchema);

export const validateProduct = (productDetails: Product) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    price: Joi.number().required().min(1),
    quantity: Joi.number().required().min(1),
    unit: Joi.string().required().valid("Pack", "Kgs", "Grams"),
  });

  return schema.validate(productDetails);
};
