import { useState } from "react";
import { toast } from "react-toastify";
import { signin } from "../api";
import { AuthEnum } from "../interface";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "arjun@gmail.com",
    password: "arjun123",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const notify = () => toast.success("Signin successfull!");

  const handleSignin = async () => {
    const signinRes = await signin(formData);
    if (signinRes.success) {
      const stringifiedRes = JSON.stringify(signinRes.response);
      localStorage.setItem("mozata-session", stringifiedRes);
      notify();
      navigate("/dashboard");
    }
  };

  return (
    <section className="text-zinc-900">
      <div className="mb-4">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3 outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3 outline-none"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSignin}
          className="bg-green-600 text-gray-200 py-2 px-8 rounded capitalize hover:bg-green-500 active:bg-green-600"
        >
          {AuthEnum.SIGNIN}
        </button>
      </div>
    </section>
  );
};

export default Signin;
