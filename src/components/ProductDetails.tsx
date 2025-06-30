import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import { formatCurrency } from "../helpers";
import type { Product } from "../types";
import { deleteProduct } from "../services/ProductService";
import { motion } from "framer-motion";

type Props = {
  product: Product;
  index: number;
};

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params;

  if (id !== undefined) {
    await deleteProduct(+id);
    return redirect("/");
  }
}

export default function ProductDetails({ product, index }: Props) {
  const fetcher = useFetcher(); //* Use action without redirect
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b"
    >
      <td className="p-4 text-lg text-gray-800">{product.name}</td>
      <td className="p-4 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-4 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-full px-4 py-2 text-xs uppercase font-bold hover:cursor-pointer bg-gray-100`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-4 text-lg text-gray-800">
        <div className="flex items-center gap-2">
          <button
            className="flex gap-2 px-4 py-2 text-sm font-bold text-center text-white uppercase bg-indigo-600 rounded-lg"
            onClick={() => navigate(`/productos/${product.id}/editar`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="sr-only md:not-sr-only">Editar</span>
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`/productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Estás seguro de eliminar este producto?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              className="flex gap-2 px-4 py-2 text-sm font-bold text-center text-white uppercase bg-red-600 rounded-lg"
              type="submit"
              value="Eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <span className="sr-only md:not-sr-only">Eliminar</span>
            </button>
          </Form>
        </div>
      </td>
    </motion.tr>
  );
}
