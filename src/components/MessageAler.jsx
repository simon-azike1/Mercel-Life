import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion"; // <-- Add this import

export default function MessageAlert({ type = "success", message, onClose }) {
  const colors = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  const icons = {
    success: <CheckCircle className="h-6 w-6 mr-2" />,
    error: <XCircle className="h-6 w-6 mr-2" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex items-center p-4 rounded-lg shadow-md ${colors[type]} max-w-md mx-auto mt-4`}
      >
        {icons[type]}
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          X
        </button>
      </div>
    </motion.div>
  );
}
