import { motion } from "framer-motion";
import { itemVariants } from "../../utils/constants";

const HeaderAbout = () => {
  return (
    <motion.div variants={itemVariants} className="mb-12 sm:mb-16 text-center">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase">
        About <span className="text-gray-500">Us</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
        Introducing us from Computer Engineering Technology students at IPB
        University Vocational School
      </p>
    </motion.div>
  );
};

export default HeaderAbout;
