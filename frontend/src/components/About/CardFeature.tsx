import { motion } from "framer-motion";
import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const features = [
  {
    icon: <IoSpeedometerOutline className="text-white text-2xl" />,
    title: "Real-time Monitoring",
    desc: "Pemantauan sensor dengan latensi rendah...",
  },
  {
    icon: <IoShieldCheckmarkOutline className="text-white text-2xl" />,
    title: "Sistem baik dan siap pakai",
    desc: "Kuat dan tahan lama",
  },
  {
    icon: <IoRocketOutline className="text-white text-2xl" />,
    title: "Fitur modern",
    desc: "Memiliki fitur canggih berbasis IoT dan Web",
  },
];

const CardFeature = () => {
  return (
    <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white text-black p-5 sm:p-6 rounded-2xl sm:rounded-3xl hover:bg-gray-100 transition-colors duration-300 group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CardFeature;
