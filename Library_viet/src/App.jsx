import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import ProductUpdate from "./pages/ProductUpdate";
import AddProduct from "./pages/AddProduct";

function App() {
  const element = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/product/:id", element: <ProductDetail /> },
        { path: "/edit/:id", element: <ProductUpdate /> },
      ],
    },
    { path: "/add", element: <AddProduct /> },
  ]);
  return element;
}

export default App;
