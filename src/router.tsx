import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  action as updateProductAvailabilityAction,
  loader as productLoader,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  action as editProductAction,
  loader as editProductLoader,
} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        action: updateProductAvailabilityAction,
        loader: productLoader,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar", //* ROA Pattern: Resource Oriented Architecture
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader,
      },
      {
        path: "productos/:id/eliminar", //* ROA Pattern: Resource Oriented Architecture
        action: deleteProductAction,
      },
    ],
  },
]);
