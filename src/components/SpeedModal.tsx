import { useState } from "react";
import { motion } from "framer-motion";

export default function SpeedModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [speed, setSpeed] = useState<"Rendah" | "Sedang" | "Tinggi">("Sedang");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-11/12 max-w-md text-black border-2 border-black shadow-2xl"
      >
        <h3 className="text-lg font-bold mb-4">Atur Kecepatan</h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="speed"
              checked={speed === "Rendah"}
              onChange={() => setSpeed("Rendah")}
            />
            <span>Rendah</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="speed"
              checked={speed === "Sedang"}
              onChange={() => setSpeed("Sedang")}
            />
            <span>Sedang</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="speed"
              checked={speed === "Tinggi"}
              onChange={() => setSpeed("Tinggi")}
            />
            <span>Tinggi</span>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="text-gray-600" onClick={onClose}>
            Batal
          </button>
          <button
            className="bg-black text-white font-bold px-4 py-2 rounded-xl border-2 border-black"
            onClick={() => {
              alert(`Kecepatan: ${speed} (mock)`);
              onClose();
            }}
          >
            Terapkan
          </button>
        </div>
      </motion.div>
    </div>
  );
}
