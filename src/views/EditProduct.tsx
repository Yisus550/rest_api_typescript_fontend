import {
  Link,
  Form,
  useActionData,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); //* Convert FormData to object
  let error = Object.values(data).includes("")
    ? "Todos los campos son obligatorios"
    : "";

  if (error) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(+params.id, data);
  }

  return redirect("/"); //! All actions must redirect or return something
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (id !== undefined) {
    const product = await getProductById(+id);
    if (!product) {
      redirect("/");
    }
    return product;
  }

  return {};
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="p-3 text-sm font-bold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="block w-full p-3 mt-2 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Actualizar Producto"
        />
      </Form>
    </>
  );
}
