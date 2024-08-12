import { useState, useSyncExternalStore } from "react";
import Dropdown from "./Dropdown";
import { setAuthUser, storeAuth } from "../../store/authStore";
import { Link } from "react-router-dom";
import { TUser } from "../../types/user.type";
import SignOut from "../icons/SignOut";
import SwitchTheme from "../SwitchTheme";

const Navbar = () => {
  const userLocalStorage = useSyncExternalStore(
    storeAuth.subscribe,
    storeAuth.getSnapshot,
  );

  const { name, email }: TUser = JSON.parse(userLocalStorage);

  const [isOpen, setIsOpen] = useState(false);
  const onLogout = () => {
    setAuthUser(null);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-50 shadow-md dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 lg:px-8">
        <Link
          to={"/dashboard/profile"}
          className="flex animate-pulse items-center gap-x-2 text-teal-600"
        >
          <img
            src={`https://robohash.org/${name + email}.png?size=50x50`}
            alt={`Avatar : ME`}
            className="rounded-full bg-slate-500"
          />
          <p>{name}</p>
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-4">
            <Dropdown label="Pages" isOpen={isOpen} setIsOpen={setIsOpen}>
              <div className="bg-gray-800 dark:bg-white">
                <SwitchTheme />
              </div>

              <Link
                onClick={() => setIsOpen(false)}
                to={"/dashboard"}
                className="block w-full bg-gray-800 px-3 py-[10px] text-left text-white transition-colors ease-in hover:bg-black/30 focus:bg-black/30 dark:bg-white dark:text-[#1B4E6B]"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to={"/dashboard/profile"}
                className="focus:bg-black/hover:bg-black/30 block w-full bg-gray-800 px-3 py-[10px] text-left text-white transition-colors ease-in hover:bg-black/30 dark:bg-white dark:text-[#1B4E6B]"
              >
                {name}
              </Link>

              <button
                type="button"
                className="flex w-full items-center justify-between bg-gray-800 px-3 py-[10px] text-left transition-colors ease-in hover:bg-black/30 dark:bg-white dark:text-[#1B4E6B]"
                onClick={onLogout}
              >
                <span className="text-white dark:text-[#1B4E6B]">Logout</span>

                <SignOut className="size-6 stroke-white dark:stroke-[#1B4E6B]" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
