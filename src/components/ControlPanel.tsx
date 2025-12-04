import { useState } from "react";
import { motion } from "framer-motion";
import SpeedModal from "./SpeedModal";
import { IoFlash, IoWarning } from "react-icons/io5";
import { MdOutlineEmergency } from "react-icons/md";

export default function ControlPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-4 w-full ">
      <div className="relative w-1/2 overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <IoFlash className="text-8xl text-black" />
        </div>

        <div className="relative z-10 mb-6">
          <h3 className="text-lg font-bold text-black mb-1 tracking-wide">
            Motor Control
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Adjust RPM Output
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="relative w-full group/btn overflow-hidden rounded-xl bg-black p-px"
          onClick={() => setOpen(true)}
        >
          <div className="relative bg-black rounded-xl py-4 px-6 transition-all duration-300 group-hover/btn:bg-gray-900">
            <div className="flex items-center justify-center gap-3">
              <IoFlash className="text-xl text-white" />
              <span className="font-bold text-white uppercase tracking-wider">
                Set Speed
              </span>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="relative w-1/2 overflow-hidden bg-white border border-red-200 rounded-3xl p-6 shadow-lg">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-1 tracking-wide flex items-center gap-2">
              <IoWarning /> Emergency
            </h3>
            <p className="text-xs text-red-400 uppercase tracking-widest">
              Force Stop System
            </p>
          </div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-red-600 text-white font-black py-6 px-6 shadow-lg hover:shadow-red-500/30 transition-all duration-300 text-2xl uppercase tracking-widest rounded-xl cursor-pointer flex items-center justify-center gap-3"
          onClick={() => alert("EMERGENCY STOP TRIGGERED")}
        >
          <MdOutlineEmergency className="text-3xl animate-pulse" /> STOP
        </motion.button>
      </div>

      <SpeedModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
