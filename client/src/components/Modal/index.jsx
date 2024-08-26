import React from 'react';

function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Error</h2>
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;
