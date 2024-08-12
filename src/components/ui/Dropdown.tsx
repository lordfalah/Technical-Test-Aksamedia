import React from "react";
import useOuterClick from "../../hooks/useOuterClick";
import ChevrontDown from "../icons/chevron/Down";

type TDropdown = {
  label: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Dropdown: React.FC<TDropdown> = ({
  label,
  isOpen,
  setIsOpen,
  children,
}) => {
  const outerElement = useOuterClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={outerElement} className="relative z-40 w-40">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-3 py-[10px] dark:bg-white"
      >
        <p className="text-sm font-medium text-white dark:text-[#1B4E6B]">
          {label}
        </p>
        <ChevrontDown
          className={`size-[18px] stroke-[#1B4E6B] transition-transform ease-in ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`absolute top-[48px] w-full overflow-hidden rounded-lg bg-white transition-all ease-in ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
