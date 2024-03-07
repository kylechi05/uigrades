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
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <LandingNavbar/>
      <div className="bg-dark flex flex-col justify-center items-center">
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
