import { Response, Request } from "express";
import { Product } from "../interface/product";
import { ProductModel, validateProduct } from "../model/productModel";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await ProductModel.find();
    return res.status(200).send(products);
  } catch {
    return res.status(404).send("unable to find products");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const body: Product = req.body;
  const { error } = validateProduct(body);
  if (error) {
    return res.status(400).send(error.message);
  } else {
    const isSameProduct = await ProductModel.findOne({ title: body.title });

    if (isSameProduct) {
      return res.status(500).send("product already available");
    }

    const product: Product = new ProductModel({
      title: body.title,
      unit: body.unit,
      price: body.price,
      quantity: body.quantity,
    });

    try {
      const response = await product.save();
      return res.status(200).send(response);
    } catch (err: any) {
      return res.status(404).send(`${err} `);
    }
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;

  try {
    const product = await ProductModel.findById(id);
    if (product) {
      return res.status(200).send({
        title: product.title,
        unit: product.unit,
        price: product.price,
        quantity: product.quantity,
      });
    }
  } catch (err) {
    return res.status(404).send(`Product not found ${err}`);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;

  const { title, unit, price, quantity } = req.body;

  try {
    const product = await ProductModel.findById(id);

    if (product) {
      if (
        !product.title ||
        !product.unit ||
        !product.price ||
        !product.quantity
      ) {
        return res.status(400).send("Bad request");
      } else {
        product.title = title;
        product.unit = unit;
        product.price = price;
        product.quantity = quantity;

        const updatedProduct = await product.save();

        return res.status(200).send(updatedProduct);
      }
    } else {
      return res.status(404).send("Product not found");
    }
  } catch {
    return res.status(404).send("Product not found");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;

  try {
    await ProductModel.findByIdAndDelete(id);

    return res.status(200).send("Product deleted");
  } catch {
    return res.status(404).send("Product not found");
  }
};
