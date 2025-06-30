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
import { motion } from "framer-motion";
import { itemVariants } from "../main";

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
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3"
    >
      <div className="flex justify-between col-span-3">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="flex gap-4 px-6 py-3 text-sm font-bold text-indigo-600 transition-colors border border-indigo-600 rounded-lg shadow-sm h-fit hover:text-white hover:bg-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hidden md:block size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span className="hidden md:block">Volver a productos</span>
          <span className="block md:hidden">Volver</span>
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="col-span-3 p-6 mt-10 bg-white rounded-lg md:col-span-2" method="POST">
        <ProductForm product={product} />

        <label className="font-bold text-gray-800" htmlFor="availability">
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

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Actualizar Producto"
        />
      </Form>
    </motion.div>
  );
}
