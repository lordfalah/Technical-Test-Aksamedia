import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { storeAuth } from "../store/authStore";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { useThemeDetector } from "../hooks/useThemeDetector";

const RootLayout = () => {
  useThemeDetector(); // run theme

  const [isFlashing, setIsFlashing] = useState(true);
  const authorizedUser = useSyncExternalStore(
    storeAuth.subscribe,
    storeAuth.getSnapshot,
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = authorizedUser !== "null" ? true : false;

  useEffect(() => {
    if (!isAuth && pathname !== "/") {
      // Jika belum login dan bukan di halaman root (/), arahkan ke root (/)
      navigate("/", { replace: true });
    } else if (isAuth && pathname === "/") {
      // Jika sudah login dan berada di halaman root (/), arahkan ke dashboard
      navigate("/dashboard", { replace: true });
    }

    setIsFlashing(false);
  }, [isAuth, navigate, pathname]);

  return (
    <Fragment>
      {isAuth ? <Navbar /> : <header></header>}
      {isFlashing ? null : (
        <main className="bg-gray-200 dark:bg-gray-800">
          <Outlet />
        </main>
      )}
      <Footer />
    </Fragment>
  );
};

export default RootLayout;
