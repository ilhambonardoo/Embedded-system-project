import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronBack,
  IoChevronForward,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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

const teamMembers = [
  {
    name: "Tim Pengembang Embedded System",
    role: "Development Team 2025",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/public/Teams/tim1.jpeg",
  },
  {
    name: "Tim Pengembang Embedded System",
    role: "Development Team 2025",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/public/Teams/tim2.jpeg",
  },
  {
    name: "Tim Pengembang Embedded System",
    role: "Development Team 2025",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/public/Teams/tim3.jpeg",
  },
];

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

const techStack = ["Firebase", "Express", "React", "NodeJS"];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12 font-sans pb-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="mb-12 sm:mb-16 text-center"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase">
            Tentang <span className="text-gray-500">Kami</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            Platform monitoring embedded system berkinerja tinggi untuk presisi,
            kecepatan, dan keandalan data real-time.
          </p>
        </motion.div>

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

        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <div className="border-t border-neutral-800 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 uppercase tracking-wider text-center">
              Tim Pengembang
            </h2>

            {/* Carousel Container */}
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full"
                >
                  <div className="bg-linear-to-br from-white to-gray-100 text-black rounded-3xl overflow-hidden shadow-2xl">
                    {/* Photo Section */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-center"
                    >
                      <img
                        src={teamMembers[currentSlide].url}
                        alt="Tim Pengembang"
                        className="object-top"
                      />
                      <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                        {teamMembers[currentSlide].name}
                      </p>
                    </motion.div>

                    {/* Info Section */}
                    <div className="p-6 sm:p-8 md:p-10">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 uppercase tracking-wider">
                          {teamMembers[currentSlide].name}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-600 mb-4 uppercase tracking-widest">
                          {teamMembers[currentSlide].role}
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          {teamMembers[currentSlide].description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6 sm:mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="p-3 sm:p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <IoChevronBack className="text-xl sm:text-2xl cursor-pointer" />
                </motion.button>

                {/* Slide Indicators */}
                <div className="flex gap-2">
                  {teamMembers.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-3 sm:h-4 rounded-full transition-all ${
                        idx === currentSlide
                          ? "bg-white w-8 sm:w-10"
                          : "bg-gray-600 w-3 sm:w-4"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="p-3 sm:p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <IoChevronForward className="text-xl sm:text-2xl cursor-pointer" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8">
            Ditenagai Oleh Teknologi
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:bg-gray-200 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
