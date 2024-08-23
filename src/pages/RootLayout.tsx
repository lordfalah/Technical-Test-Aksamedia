import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useStoreAuth } from "../store/authStore";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { useThemeDetector } from "../hooks/useThemeDetector";
import { type TUser } from "../types/user.type";

const RootLayout = () => {
  useThemeDetector(); // run theme
  const isAuth: TUser = JSON.parse(useStoreAuth()) || null;

  return (
    <Fragment>
      {isAuth ? <Navbar /> : <header></header>}

      <main className="bg-gray-200 dark:bg-gray-800">
        <Outlet />
      </main>

      <Footer />
    </Fragment>
  );
};

export default RootLayout;
