import { useRoutes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const element = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/add",
          element: <AddProduct />,
        },
        {
          path: "/edit/:id",
          element: <EditProduct />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
      ],
    },
  ]);
  return element;
}

export default App;
