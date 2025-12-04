import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header({
  onNavigate,
  currentPage,
}: {
  onNavigate: (page: "dashboard" | "about") => void;
  currentPage: "dashboard" | "about";
}) {
  const [now, setNow] = useState(new Date());
  const [status] = useState<"OPERASIONAL" | "WARNING" | "STOP">("OPERASIONAL");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="relative z-50 bg-black border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <IoSettingsOutline className="text-black text-xl animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-white leading-none">
                SYSTEM<span className="text-gray-400">OS</span>
              </h1>
              <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                Control Unit v2.0
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
            <NavButton
              active={currentPage === "dashboard"}
              onClick={() => onNavigate("dashboard")}
            >
              Dashboard
            </NavButton>
            <NavButton
              active={currentPage === "about"}
              onClick={() => onNavigate("about")}
            >
              About
            </NavButton>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
              System Status
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "OPERASIONAL" ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-bold tracking-wide ${
                  status === "OPERASIONAL" ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 hidden md:block" />

          <div className="text-right">
            <div className="text-xl font-mono font-bold text-white leading-none">
              {now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-[10px] text-gray-500 font-mono">
              {now.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavButton({
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
