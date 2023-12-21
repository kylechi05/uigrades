import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext.js";

function Changelog() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "UIGrades | Changelog";
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-graph-dark" : "bg-graph"
        } bg-cover bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <Navbar />
      <div className={`w-full flex justify-start h-screen mt-20 items-center flex-col gap-5`}>
        <div
          className={`flex justify-center items-center flex-col ${
            isDarkMode ? "text-zinc-200" : "text-zinc-700"
          }`}
        >
          <h1 className="font-bold text-3xl md:text-5xl">
            Changelog
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Changelog;
