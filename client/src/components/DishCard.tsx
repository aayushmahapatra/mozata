import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToOrder,
  removeItemFromOrder,
} from "../redux/order/order.reducers";
import { IRootState } from "../redux/root-state.interface";

interface IDishCard {
  restaurantId: string;
  restaurantName: string;
  id: string;
  name: string;
  price: number;
}

const DishCard: FC<IDishCard> = ({
  restaurantId,
  restaurantName,
  id,
  name,
  price,
}) => {
  const dispatch = useDispatch();
  const orderRestaurant = useSelector((state: IRootState) =>
    state.order.orders.find(
      (orderRestaurant) => orderRestaurant.restaurantId === restaurantId
    )
  );
  const order =
    orderRestaurant?.items.find((order) => order.id === id)?.quantity || 0;

  const handleAddToOrder = () => {
    dispatch(
      addItemToOrder({
        restaurantId,
        restaurantName: restaurantName,
        item: { id, name, price: price || 0, quantity: 1 },
      })
    );
  };

  const handleRemoveFromOrder = () => {
    dispatch(removeItemFromOrder({ restaurantId, itemId: id }));
  };

  return (
    <section className="border border-gray-300 w-60 rounded cursor-pointer shadow hover:bg-gray-300">
      <img
        src="https://bafybeiabe6kgu3ais5voe3zkyzurjfixg4cu57v4yh3dj7ijnsnctta2pq.ipfs.sphn.link/burger-hotdog.png"
        alt="food"
        className="w-full h-32 bg-center bg-contain"
      />
      <section className="p-2 ">
        <div className="font-bold">{name}</div>
        <div className="text-sm">₹{price}</div>
        <section>
          {order === 0 ? (
            <div className="flex justify-center mt-2">
              <button
                onClick={handleAddToOrder}
                className="bg-green-600 text-gray-200 rounded text-sm py-1 px-4"
              >
                Add +
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={handleRemoveFromOrder}
                className="bg-gray-600 text-gray-200 rounded text-sm py-1 px-3"
              >
                -
              </button>
              <div>{order}</div>
              <button
                onClick={handleAddToOrder}
                className="bg-green-600 text-gray-200 rounded text-sm py-1 px-3"
              >
                +
              </button>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default DishCard;
