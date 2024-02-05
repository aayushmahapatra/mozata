import { FC, useState } from "react";
import { signup } from "../api";
import { AuthEnum } from "../interface";

interface ISignup {
  setPage: (page: AuthEnum) => void;
}

const Signup: FC<ISignup> = ({ setPage }) => {
  const [formData, setFormData] = useState({
    email: "arjun@gmail.com",
    phone: "111-222-4444",
    name: "Arjun",
    password: "arjun123",
    address: {
      street: "101 Dalal Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: 30033,
    },
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "address"
          ? { ...prevData.address, [e.target.id]: value }
          : value,
    }));
  };

  const handleSignup = async () => {
    const signupRes = await signup(formData);
    if (signupRes.success) {
      console.log(signupRes.response);
      setPage(AuthEnum.SIGNIN);
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
          htmlFor="phone"
        >
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3 outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={formData.name}
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
      <div className="mb-4">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="street"
        >
          Street:
        </label>
        <input
          type="text"
          id="street"
          name="address"
          placeholder="street"
          value={formData.address.street}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3 outline-none"
        />
      </div>
      <div className="flex gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="address"
            placeholder="city"
            value={formData.address.city}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State:
          </label>
          <input
            type="text"
            id="state"
            name="address"
            placeholder="state"
            value={formData.address.state}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="zipCode"
          >
            Zip Code:
          </label>
          <input
            type="number"
            id="zipCode"
            name="address"
            placeholder="zipCode"
            value={formData.address.zipCode}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSignup}
          className="bg-green-600 text-gray-200 py-2 px-8 rounded capitalize hover:bg-green-500 active:bg-green-600"
        >
          {AuthEnum.SIGNUP}
        </button>
      </div>
    </section>
  );
};

export default Signup;
