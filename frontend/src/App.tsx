import Dashboard from "./views/Dashboard";
import About from "./views/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const AppContent = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const currentPage = location === "/dashboard" ? "dashboard" : "about";

  return (
    <div className="relative overflow-hidden font-mono selection:bg-white selection:text-black">
      <Header
        onNavigate={(page) =>
          navigate(page === "dashboard" ? "/dashboard" : "/")
        }
        currentPage={currentPage}
      />
      <div className="relative z-10 flex flex-col ">
        <main className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
