import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Loading from "../components/Loading.tsx";
import { useTheme } from "../context/ThemeContext.js";

const Contact = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = "UIGrades | Contact";
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "de4c836a-d8df-45b4-a690-b2221217e60c");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    setLoading(false);
    if (res.success) {
      setResult(res.message);
      // Clear the form inputs
      setFormData({ name: "", email: "", message: "" });
    } else {
      setResult(res.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
        <div
          className={`flex justify-center items-center flex-col ${
            isDarkMode ? "text-zinc-200" : "text-zinc-700"
          }`}
        >
          <h1 className="font-bold text-3xl md:text-5xl">
            Questions or Concerns?
          </h1>
          <p>Send us a message below!</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center gap-4 w-full"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${
              isDarkMode ? "bg-zinc-600 text-zinc-200" : "text-zinc-700"
            } w-4/5 md:w-2/3 lg:w-2/5 h-10 pl-2 focus:outline-none rounded-md shadow-md`}
            required
            placeholder="Your name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${
              isDarkMode ? "bg-zinc-600 text-zinc-200" : "text-zinc-700"
            } w-4/5 md:w-2/3 lg:w-2/5 h-10 pl-2 focus:outline-none rounded-md shadow-md`}
            required
            placeholder="Your email"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className={`${
              isDarkMode ? "bg-zinc-600 text-zinc-200" : "text-zinc-700"
            } focus:outline-none rounded-md shadow-md w-4/5 md:w-2/3 lg:w-2/5 h-40 p-2`}
            placeholder="Your message here..."
          ></textarea>
          <button
            type="submit"
            className={`${
              isDarkMode
                ? "bg-zinc-300 text-zinc-700 hover:bg-zinc-400"
                : "bg-black hover:bg-zinc-700 text-zinc-300"
            } text-stone-50 w-20 h-10 p-4 flex justify-center items-center rounded-lg transition duration-200`}
          >
            Send
          </button>
        </form>
        <div className="relative w-48 text-center">
          {loading ? (
            <Loading small />
          ) : (
            <span className={`${isDarkMode ? "text-zinc-200" : ""}`}>
              {result}
            </span>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
