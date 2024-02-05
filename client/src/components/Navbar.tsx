import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signout } from "../api";
import { clearSearch, fetchDishesByKeyword } from "../redux/dish/dish.reducers";
import { IRootState } from "../redux/root-state.interface";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [keyword, setKeyword] = useState<string>("");
  const searchResults = useSelector(
    (state: IRootState) => state.dish.searchResults
  );

  const notify = () => toast.success("Signout successfull!");

  const handleSignout = async () => {
    const signoutRes = await signout();
    if (signoutRes.success) {
      console.log(signoutRes.response);
      localStorage.removeItem("mozata-session");
      notify();
      navigate("/");
    }
  };

  const handleSearch = () => {
    const session = localStorage.getItem("mozata-session");
    if (!session) {
      navigate("/");
    } else {
      const parsedSession = JSON.parse(session);
      const data = { token: parsedSession.token, keyword };
      dispatch(fetchDishesByKeyword(data));
    }
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(clearSearch());
  };

  return (
    <>
      <nav className="py-3 px-1 flex items-center justify-between w-full">
        <div className="text-xl font-bold">Mozata</div>
        <div className="flex gap-4">
          <div className="hidden md:flex md:items-center md:gap-2 bg-gray-200 border border-zinc-900 px-4 py-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
            <input
              className="bg-gray-200 outline-none"
              placeholder="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {!!searchResults[0] && <button onClick={handleClear}>Clear</button>}
        </div>
        <button
          onClick={handleSignout}
          className="bg-green-600 text-gray-200 py-2 px-8 rounded capitalize hover:bg-green-500 active:bg-green-600"
        >
          Signout
        </button>
      </nav>
      <section className="flex flex-wrap gap-4 no-scrollbar w-full justify-center lg:justify-start mt-6">
        {searchResults?.map((dish: any, i: number) => (
          <div key={i}>
            <section className="border border-gray-300 w-60 rounded cursor-pointer shadow hover:bg-gray-300">
              <img
                src="https://bafybeiabe6kgu3ais5voe3zkyzurjfixg4cu57v4yh3dj7ijnsnctta2pq.ipfs.sphn.link/burger-hotdog.png"
                alt="food"
                className="w-full h-32 bg-center bg-contain"
              />
              <section className="p-2 ">
                <div className="font-bold">{dish.name}</div>
                <div className="text-sm">₹{dish.price}</div>
              </section>
            </section>
          </div>
        ))}
      </section>
    </>
  );
};

export default Navbar;
