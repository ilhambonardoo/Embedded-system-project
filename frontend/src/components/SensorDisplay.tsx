import { motion } from "framer-motion";
import type { SensorData } from "../types";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SensorDisplayProps {
  sensors: SensorData;
  loading: boolean;
  history: SensorData[];
}

export default function SensorDisplay({
  sensors,
  history,
  loading,
}: SensorDisplayProps) {
  const sensorList = [
    {
      id: "berat",
      name: "BERAT",
      value: sensors.berat,
      unit: "KG",
      color: "#000000",
      format: (v?: number) => v?.toFixed(2) || "0.00",
    },
    {
      id: "pwm",
      name: "PWM",
      value: sensors.pwm,
      unit: "%",
      color: "#000000",
      format: (v?: number) => v || 0,
    },
    {
      id: "rpm",
      name: "RPM",
      value: sensors.rpm,
      unit: "RPM",
      color: "#000000",
      format: (v?: number) => v || 0,
    },
  ];

  if (loading) {
    return (
      <section className="w-full mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-neutral-100 rounded-3xl h-56 w-full"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sensorList.map((sensor, idx) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="group relative bg-white overflow-hidden rounded-3xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 h-56 flex flex-col justify-between p-6"
          >
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    LIVE SENSOR
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-600 tracking-wide">
                  {sensor.name}
                </h3>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-1">
                <motion.span
                  key={sensor.value}
                  initial={{ opacity: 0.8, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-black tracking-tighter text-black font-mono"
                >
                  {sensor.format(sensor.value)}
                </motion.span>
                <span className="text-sm font-bold text-neutral-400 self-end mb-2 ml-1">
                  {sensor.unit}
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 w-full z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient
                      id={`gradient-${sensor.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#000" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={sensor.id}
                    stroke="#000"
                    strokeWidth={2}
                    fill={`url(#gradient-${sensor.id})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
