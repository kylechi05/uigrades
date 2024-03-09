import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Loading from "../components/Loading.tsx";
import LandingNavbar from "../components/LandingNavbar.tsx";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormDataInterface {
  name: string;
  value: string;
}

const Contact:React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    document.title = "UIGrades | Contact";
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value }: FormDataInterface = event.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen bg-dark">
      <LandingNavbar/>
      <div className="flex flex-col justify-start items-center h-screen gap-10 w-full">
          <div className="flex justify-center items flex-col w-full text-zinc-300 text-center gap-5 mt-10 px-4">
              <h1 className="text-4xl md:text-7xl font-bold text-primary">Questions or Concerns?</h1>
              <p className="text-xl md:text-4xl">Reach out to us to stay up to date or report any issues you encounter</p>
          </div>
          <form className="flex justify-center items-center flex-col gap-8 w-full text-white py-10 max-w-[400px]">
            <div className="flex justify-between p-4 items-start outline-1 outline text-zinc-300 flex-col w-full rounded-2xl h-20 text-sm bg-zinc-800">
              <p>Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Leo"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <div className="flex justify-between p-4 items-start outline-1 outline text-zinc-300 flex-col w-full rounded-2xl h-20 text-sm bg-zinc-800">
              <p>Email</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="leo@email.com"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <div className="flex justify-start gap-4 p-4 items-start outline-1 outline text-zinc-300 flex-col w-full rounded-2xl h-40 text-sm bg-zinc-800">
              <p>Message</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message here"
                className="bg-transparent w-full outline-none"
              />
            </div>
              <button type="submit" className="main-button-n">
                <div className="main-button-inner">
                  <div className="main-button-text">Submit</div>
                </div>
              </button>
              {loading && <Loading />}
              <p className="text-zinc-300">{result}</p>
          </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
