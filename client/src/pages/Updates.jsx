import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext.js";

function Updates() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "UIGrades | Change Log";
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
      <div className={`w-full flex justify-center items-center flex-col gap-5`}>
        <h1>Hello</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Updates;
