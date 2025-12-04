import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import Header from "./components/Header";

const App = () => {
  const [page, setPage] = useState<"dashboard" | "about">("dashboard");

  return (
    <div className="relative min-h-screen overflow-hidden font-mono selection:bg-white selection:text-black">
      <Header onNavigate={setPage} currentPage={page} />
      <div className="relative z-10 flex flex-col h-screen">
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {page === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <Dashboard />
              </motion.div>
            )}
            {page === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <About onNavigate={setPage} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
