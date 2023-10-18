import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/productController";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", createProduct);
productsRouter.get("/:productId", getProduct);
productsRouter.put("/:productId", updateProduct);
productsRouter.delete("/:productId", deleteProduct);
