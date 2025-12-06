import { motion } from "framer-motion";
export default function NavButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 cursor-pointer ${
        active
          ? "text-black"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white rounded-md"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
