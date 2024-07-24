// src/components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border-4 border-green-600">
        <span
          className="absolute top-0 right-0 p-4 text-gray-700 cursor-pointer"
          onClick={closeModal}
        >
          ×
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
