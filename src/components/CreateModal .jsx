import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';

const CreateModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        
        <div className="space-y-4">
          <button
            onClick={() => {
              onClose();
              navigate('/create');
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-semibold"
          >
            <FiLink />
            Create Link
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/qr-code');
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 font-semibold"
          >
            <QrCode />
            Create QR Code
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateModal;