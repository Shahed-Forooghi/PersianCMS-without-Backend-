import "./App.css";
import {useRoutes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import routes from "./routes";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Sidebar />
      <div className="p-5 pr-12 sm:pr-[280px]">
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
