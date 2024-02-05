import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../redux/root-state.interface";
import { placeOrder } from "../api";

const Order = () => {
  const navigate = useNavigate();
  const orders = useSelector((state: IRootState) => state.order.orders);
  const total = useSelector((state: IRootState) => state.order.total);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [placed, setPlaced] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const notify = () => toast.success("Order placed successfully!");

  const handleOrder = async () => {
    setLoading(true);
    const session = localStorage.getItem("mozata-session");
    if (!session) {
      navigate("/");
    } else {
      setPlaced(true);
      const parsedSession = JSON.parse(session);
      const formData = {
        userId: parsedSession.userId,
        restaurantId: orders[0]?.restaurantId,
        items: orders[0]?.items.map(({ id, quantity }) => ({
          dish: id,
          quantity,
        })),
        total: total.toFixed(2),
      };
      const orderRes = await placeOrder(parsedSession.token, formData);
      if (orderRes.success) {
        notify();
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <section className="z-1 fixed bottom-0 lg:static w-[88%] lg:w-1/4 border border-gray-200 p-6 mb-2 rounded shadow h-fit bg-gray-100">
      <div className={`mb-8 ${showOrder ? "block" : "hidden"} lg:block`}>
        <h2 className="font-bold text-lg mb-4">My Orders</h2>
        {orders.map((order) => (
          <div key={order.restaurantId}>
            <h3 className="font-bold text-gray-500 text-sm mb-2">
              {order.restaurantName}
            </h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className="my-1">
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {item.quantity} x {item.name}
                    </div>
                    <div className="font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="flex gap-4 justify-between"
        onClick={() => setShowOrder(!showOrder)}
      >
        <div>Total</div>
        <div className="font-bold">₹{total.toFixed(2)}</div>
      </div>
      <div className={`w-full mt-4 ${showOrder ? "block" : "hidden"} lg:block`}>
        {placed ? (
          <div className="bg-green-600 text-white w-full py-2 px-8 rounded capitalize text-center cursor-not-allowed">
            Placed
          </div>
        ) : (
          <>
            {!orders[0] ? (
              <button className="bg-green-600 text-white w-full py-2 px-8 rounded capitalize cursor-not-allowed">
                Place Order
              </button>
            ) : (
              <button
                onClick={handleOrder}
                className="bg-green-600 text-white w-full py-2 px-8 rounded capitalize hover:bg-green-500 active:bg-green-600"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div
                      className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                      role="status"
                    />{" "}
                    Processing...
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Order;
