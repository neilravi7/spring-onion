import React from 'react';

function Alert({type, message, onClose }) {

    const alertStyles = {
        success: "bg-green-100 border-green-400 text-green-700",
        info: "bg-blue-100 border-blue-400 text-blue-700",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
        error: "bg-red-100 border-red-400 text-red-700",
      };
    
      return (
        <div className={`fixed top-28 left-1/2 transform -translate-x-1/2 px-4 py-3 border-l-4 rounded-md shadow-lg z-50 ${alertStyles[type]}`}>
          <div className="flex items-center justify-between">
            <span className="mr-4">{message}</span>
            <button onClick={onClose} className="text-xl font-bold text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
        </div>
      );
}

export default Alert;