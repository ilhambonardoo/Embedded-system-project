import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function About({
  onNavigate,
}: {
  onNavigate: (page: "dashboard" | "about") => void;
}) {
  return (
    <div className="min-h-screen text-white p-6 md:p-12 font-sans pb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => onNavigate("dashboard")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 uppercase tracking-widest text-xs font-bold cursor-pointer"
        >
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <IoArrowBack />
          </div>
          Kembali ke Dashboard
        </button>

        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Tentang <span className="text-gray-500">Sistem</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Platform monitoring embedded system berkinerja tinggi yang dirancang
            untuk presisi, kecepatan, dan keandalan data real-time.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-20">
          <div className="border-t border-white/10 pt-10">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center md:text-left">
              Tim Pengembang
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white text-black p-8 rounded-3xl flex items-center gap-6 hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                  IB
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    Ilham Bonardoo
                  </h3>
                  <p className="text-gray-600">
                    Lead Engineer & System Architect
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-8">
            Ditenagai Oleh Teknologi
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Recharts",
              "IoT",
            ].map((tech) => (
              <span
                key={tech}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all cursor-default"
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
