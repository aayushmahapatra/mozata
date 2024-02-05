import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import Order from "../components/Order";
import Navbar from "../components/Navbar";
import { fetchRestaurant, signout } from "../api";

const Restaurant: FC = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useParams();

  useEffect(() => {
    const session = localStorage.getItem("mozata-session");
    if (!session) {
      navigate("/");
    } else {
      (async () => {
        setLoading(true);
        const parsedSession = JSON.parse(session);
        const fetchRestaurantRes = await fetchRestaurant(
          restaurantId,
          parsedSession.token
        );
        if (fetchRestaurantRes.success) {
          setRestaurant(fetchRestaurantRes.response);
        } else {
          const signoutRes = await signout();
          if (signoutRes.success) {
            navigate("/");
          }
        }
        setLoading(false);
      })();
    }
  }, []);

  return (
    <main className="px-8 pb-8 bg-gray-200 min-h-screen">
      <Navbar />
      <section className="mt-8">
        <div className="text-lg font-bold text-gray-500 mb-4 text-center lg:text-left">
          {restaurant?.name}
        </div>
        {!loading ? (
          <section className="flex gap-6">
            <section className="flex flex-wrap gap-4 no-scrollbar w-full lg:w-3/4 justify-center lg:justify-start">
              {restaurant?.menu.map((dish: any, i: number) => (
                <div key={i}>
                  <DishCard
                    restaurantId={restaurantId}
                    restaurantName={restaurant.name}
                    id={dish._id}
                    name={dish.name}
                    price={dish.price}
                  />
                </div>
              ))}
            </section>
            <Order />
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

export default Restaurant;
