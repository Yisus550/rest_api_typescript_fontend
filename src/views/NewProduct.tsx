import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";
import { motion } from "framer-motion";
import { itemVariants } from "../main";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); //* Convert FormData to object
  let error = Object.values(data).includes("")
    ? "Todos los campos son obligatorios"
    : "";

  if (error) {
    return error;
  }

  await addProduct(data);
  return redirect("/"); //! All actions must redirect or return something
}

export default function NewProduct() {
  const error = useActionData() as string;

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="grid grid-cols-3">
      <div className="flex justify-between col-span-3">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="flex gap-4 px-6 py-3 text-sm font-bold text-indigo-600 transition-colors border border-indigo-600 rounded-lg shadow-sm hover:bg-indigo-600 hover:text-white"
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
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="col-span-2 p-6 mt-10 bg-white rounded-lg shadow" method="POST">
        <ProductForm />
        <input
          type="submit"
          className="w-full p-2 mt-3 text-lg font-bold text-white transition-colors bg-indigo-600 rounded cursor-pointer hover:bg-indigo-700"
          value="Registrar Producto"
        />
      </Form>
    </motion.div>
  );
}
