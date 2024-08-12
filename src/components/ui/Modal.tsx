import React from "react";

type TModal = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<TModal> = ({ children, onClose, open }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible space-y-0 bg-black/20" : "invisible"} z-50`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-gray-50 p-4 shadow transition-all sm:p-6 dark:bg-gray-900 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
