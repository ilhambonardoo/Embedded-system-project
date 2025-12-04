import { useEffect, useState } from "react";
import type { SensorBase } from "../types";
import { motion } from "framer-motion";
import Sparkline from "./charts/Sparkline";
import SimpleMeter from "./charts/SimpleMeter";

export default function SensorCard({
  sensor,
  variant,
}: {
  sensor: SensorBase;
  variant: "sparkline" | "meter" | "large";
}) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 100);
    return () => clearTimeout(t);
  }, [sensor.value]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group overflow-hidden bg-white text-black p-6 shadow-lg rounded-3xl w-full"
    >
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
              {sensor.name}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <motion.div
              animate={pulse ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.1 }}
              className={`font-mono font-bold text-black tracking-tighter ${
                variant === "large"
                  ? "text-6xl md:text-7xl"
                  : "text-4xl md:text-5xl"
              }`}
            >
              {sensor.value}
            </motion.div>
            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              {sensor.unit}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        {variant === "sparkline" && <Sparkline data={sensor.history} />}
        {variant === "meter" && <SimpleMeter value={sensor.value} />}
        {variant === "large" && (
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
            </div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">
              Live Monitoring Active
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
