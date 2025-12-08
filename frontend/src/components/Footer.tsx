import { motion } from "framer-motion";
import { itemVariants } from "../utils/constants";

const Footer = () => {
  return (
    <motion.div
      variants={itemVariants}
      className="py-7 border-t border-neutral-800 text-center"
    >
      <p className="text-gray-500 text-xs sm:text-sm">
        © 2025 CHOP-X • Embedded System Monitoring Platform
      </p>
    </motion.div>
  );
};

export default Footer;
