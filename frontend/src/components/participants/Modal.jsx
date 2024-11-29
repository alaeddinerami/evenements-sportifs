import React from 'react';

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-md w-1/3">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
      <div className="flex justify-end">
        
      </div>
    </div>
  </div>
);

export default Modal;
