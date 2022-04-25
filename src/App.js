import "antd/dist/antd.min.css";
import "./App.css";
import Layout from "./layout/OwnLayout";
import { Routes, Route } from "react-router-dom";
import Users from "./container/Users/Users";
import Orders from "./container/Orders/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
