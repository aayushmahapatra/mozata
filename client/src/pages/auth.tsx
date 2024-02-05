import { useState } from "react";
import { AuthEnum } from "../interface";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const Auth = () => {
  const [page, setPage] = useState<AuthEnum>(AuthEnum.SIGNIN);

  const AuthComponent = {
    [AuthEnum.SIGNIN]: <Signin />,
    [AuthEnum.SIGNUP]: <Signup setPage={setPage} />,
  };

  return (
    <main className="min-h-screen flex items-center justify-center auth-bg">
      <div className="bg-zinc-900 p-8 rounded shadow-md w-full my-4 mx-4 md:mx-2 md:w-1/2 lg:w-1/3 text-gray-200">
        <div className="text-center font-bold text-2xl mb-6">Mozata</div>
        <div className="flex gap-4 justify-center mb-8">
          <button
            className={`capitalize cursor-pointer ${
              page === AuthEnum.SIGNIN && "font-bold border-b border-green-600"
            }`}
            onClick={() => setPage(AuthEnum.SIGNIN)}
          >
            {AuthEnum.SIGNIN}
          </button>
          <button
            className={`capitalize cursor-pointer ${
              page === AuthEnum.SIGNUP && "font-bold border-b border-green-700"
            }`}
            onClick={() => setPage(AuthEnum.SIGNUP)}
          >
            {AuthEnum.SIGNUP}
          </button>
        </div>
        {AuthComponent[page]}
      </div>
    </main>
  );
};

export default Auth;
