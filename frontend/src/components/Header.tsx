import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import NavButton from "./NavButton";

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
    <header className="relative z-50 bg-black border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center">
              <IoSettingsOutline className="text-black text-base sm:text-xl" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold tracking-wider text-white leading-none">
                CHOP<span className="text-gray-400">-X</span>
              </h1>
              <div className="text-[8px] sm:text-[10px] text-gray-500 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Control Unit v2.0
              </div>
            </div>
          </div>

          <nav className="hidden justify-center md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
            <NavButton
              active={currentPage === "about"}
              onClick={() => onNavigate("about")}
            >
              About
            </NavButton>
            <NavButton
              active={currentPage === "dashboard"}
              onClick={() => onNavigate("dashboard")}
            >
              Dashboard
            </NavButton>
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest">
                Status
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    status === "OPERASIONAL" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`text-xs sm:text-sm font-bold tracking-wide ${
                    status === "OPERASIONAL"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {status === "OPERASIONAL" ? "OK" : status}
                </span>
              </div>
            </div>

            <div className="w-px h-6 sm:h-8 bg-white/10 hidden sm:block" />

            {/* Time */}
            <div className="text-right">
              <div className="text-base sm:text-xl font-mono font-bold text-white leading-none">
                {now.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-[8px] sm:text-[10px] text-gray-500 font-mono">
                {now.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex md:hidden justify-center items-center gap-1 mt-3 bg-white/5 p-1 rounded-lg border border-white/5">
          <NavButton
            active={currentPage === "about"}
            onClick={() => onNavigate("about")}
          >
            About
          </NavButton>
          <NavButton
            active={currentPage === "dashboard"}
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </NavButton>
        </nav>
      </div>
    </header>
  );
}
