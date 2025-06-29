import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import type { Product } from "../types";
import ProductDetails from "../components/ProductDetails";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../main";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return {};
}

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <div className="flex justify-between">
        <motion.h2 variants={itemVariants} className="text-4xl font-black text-slate-500">Productos</motion.h2>
        <Link
          to="/productos/nuevo"
          className="p-3 text-sm font-bold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <motion.div variants={itemVariants} className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="text-white bg-slate-800">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductDetails key={product.id} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
