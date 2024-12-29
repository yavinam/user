import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import User from "./components/create_user";
import Routers from "./routers";
import { userStore } from "./zustand";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routers />
      <Outlet />
    </>
  );
}

export default App;
