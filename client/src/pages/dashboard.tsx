import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { fetchAllRestaurants, signout } from "../api";
import { clearOrder } from "../redux/order/order.reducers";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleRestaurantClick = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  useEffect(() => {
    const session = localStorage.getItem("mozata-session");
    if (!session) {
      navigate("/");
    } else {
      (async () => {
        setLoading(true);
        const parsedSession = JSON.parse(session);
        const fetchRestaurantRes = await fetchAllRestaurants(
          parsedSession.token
        );
        if (fetchRestaurantRes.success) {
          setRestaurants(fetchRestaurantRes.response);
        } else {
          const signoutRes = await signout();
          if (signoutRes.success) {
            navigate("/");
          }
        }
        setLoading(false);
      })();
    }
    dispatch(clearOrder());
  }, []);

  return (
    <main className="px-8 pb-8 bg-gray-200 min-h-screen">
      <Navbar />
      <section className="mt-8">
        <div className="text-lg font-bold text-zinc-600 mb-4 text-center lg:text-left">
          What do you want to have today?
        </div>
        {!loading ? (
          <section className="flex flex-wrap gap-4 no-scrollbar justify-center lg:justify-start">
            {restaurants.map((restaurant: any, i: number) => (
              <div
                key={i}
                onClick={() => handleRestaurantClick(restaurant._id)}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </section>
        ) : (
          <section className="flex justify-center mt-20">
            <div
              className="h-8 w-8 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-zinc-900"
              role="status"
            />
          </section>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
