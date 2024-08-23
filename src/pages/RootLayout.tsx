import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/ui/Footer";
import { useThemeDetector } from "../hooks/useThemeDetector";

const RootLayout = () => {
  useThemeDetector(); // run theme

  return (
    <Fragment>
      <main className="bg-gray-200 dark:bg-gray-800">
        <Outlet />
      </main>

      <Footer />
    </Fragment>
  );
};

export default RootLayout;
