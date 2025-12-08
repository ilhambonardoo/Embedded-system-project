import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/assets/Teams/tim1.jpeg",
  },
  {
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/assets/Teams/tim2.jpeg",
  },
  {
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/assets/Teams/tim3.jpeg",
  },
];

const Teams = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };
  return (
    <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
      <div className="border-t border-neutral-800 pt-8 sm:pt-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 uppercase tracking-wider text-center">
          Our team
        </h2>

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

          <div className="flex justify-between items-center mt-6 sm:mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-3 sm:p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              <IoChevronBack className="text-xl sm:text-2xl cursor-pointer" />
            </motion.button>

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
  );
};

export default Teams;
