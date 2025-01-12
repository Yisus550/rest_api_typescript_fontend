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

type Props = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params;

  if (id !== undefined) {
    await deleteProduct(+id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: Props) {
  const fetcher = useFetcher(); //* Use action without redirect
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex items-center gap-2">
          <button
            className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-indigo-600 rounded-lg"
            onClick={() => navigate(`/productos/${product.id}/editar`)}
          >
            Editar
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
            <input
              className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-red-600 rounded-lg"
              type="submit"
              value="Eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
