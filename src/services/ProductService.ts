import { safeParse } from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(product: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: product.name,
      price: +product.price,
    });

    if (!result.success) {
      throw new Error("Invalid data");
    }

    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    await axios.post(url, {
      name: result.output.name,
      price: result.output.price,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);

    const result = safeParse(ProductsSchema, data.data);
    if (!result.success) {
      throw new Error("Invalid data");
    }

    return result.output;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);

    const result = safeParse(ProductSchema, data.data);
    if (!result.success) {
      throw new Error("Invalid data");
    }

    return result.output;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(id: Product["id"], product: ProductData) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: product.name,
      price: +product.price,
      availability: toBoolean(product.availability.toString()),
    });

    if (!result.success) {
      throw new Error("Invalid data");
    }

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.put(url, result.output);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.error(error);
  }  
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.error(error);
  }
}
