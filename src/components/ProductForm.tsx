import type { Product } from "../types";

type Props = {
  product?: Product;
};

export default function ProductForm({ product }: Props) {
  return (
    <>
      <div className="mb-4">
        <label className="font-bold text-gray-800" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="block w-full p-3 mt-2 bg-gray-50"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="mb-4">
        <label className="font-bold text-gray-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="block w-full p-3 mt-2 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}
