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
import { motion } from "motion/react";
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
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="p-3 text-sm font-bold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm />
        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Registrar Producto"
        />
      </Form>
    </motion.div>
  );
}
