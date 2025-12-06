import { motion } from "framer-motion";

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

const Footer = () => {
  return (
    <motion.div
      variants={itemVariants}
      className="my-12 sm:mt-16 pt-8 sm:pt-10 border-t border-neutral-800 text-center"
    >
      <p className="text-gray-500 text-xs sm:text-sm">
        © 2025 CHOP-X • Embedded System Monitoring Platform
      </p>
    </motion.div>
  );
};

export default Footer;
