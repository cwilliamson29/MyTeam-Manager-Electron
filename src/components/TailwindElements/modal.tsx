import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg">
        <button
          className="absolute top-0 right-0 m-4 text-black bg-gray-500"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-lg font-bold">Modal Title</h2>
        <p className="mt-4">This is a modal content.</p>
      </div>
    </div>
  );
}
