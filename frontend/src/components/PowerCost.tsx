import { motion } from "framer-motion";
import type { SensorData } from "../types";
import { formatRupiah, formatKwh } from "../utils/CurrencyFormat";

interface PowerCostProps {
  sensors: SensorData;
  loading: boolean;
}

const PowerCost = ({ sensors, loading }: PowerCostProps) => {
  if (loading) {
    return (
      <section className="w-full mb-8">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="bg-neutral-100 rounded-3xl h-56 w-full"
        />
      </section>
    );
  }

  const costItems = [
    {
      id: "kwh",
      name: "Energy Usage",
      value: sensors.total_kwh || 0,
      unit: "kWh",
      format: (v: number) => formatKwh(v),
    },
    {
      id: "cost",
      name: "Daily Cost",
      value: sensors.total_cost || 0,
      unit: "IDR",
      format: (v: number) => formatRupiah(v),
    },
  ];

  return (
    <section className="w-full mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {costItems.map((item, idx) => (
          <motion.div
            key={item.id}
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
                    LIVE DATA
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-600 tracking-wide">
                  {item.name}
                </h3>
              </div>
            </div>

            <div className="relative z-10">
              <motion.span
                key={item.value}
                initial={{ opacity: 0.8, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black tracking-tighter text-black font-mono"
              >
                {item.format(item.value)}
              </motion.span>
              <p className="text-xs text-neutral-400 mt-2 tracking-widest uppercase">
                {item.unit}
              </p>
            </div>

            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-black rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PowerCost;
