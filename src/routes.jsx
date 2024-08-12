import Products from "./Components/Products/Products";
import Comments from "./Components/Comments/Comments";
import Users from "./Components/Users/Users";
import Orders from "./Components/Orders/Orders";
import Offs from "./Components/Offs/Offs";
import Home from "./Components/Home/Home";

const routes = [
  { id: 1, path: "/", element: <Home /> },
  { id: 2, path: "/products", element: <Products /> },
  { id: 3, path: "/comments", element: <Comments /> },
  { id: 4, path: "/users", element: <Users /> },
  { id: 5, path: "/orders", element: <Orders /> },
  { id: 6, path: "/offs", element: <Offs /> },
];

export default routes;
