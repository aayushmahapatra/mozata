import { FC } from "react";

interface IRestaurantCard {
  restaurant: any;
}

const RestaurantCard: FC<IRestaurantCard> = ({ restaurant }) => {
  return (
    <section className="border border-gray-300 w-full max-w-60 md:w-60 rounded cursor-pointer hover:bg-gray-300">
      <img
        src="https://bafybeiabe6kgu3ais5voe3zkyzurjfixg4cu57v4yh3dj7ijnsnctta2pq.ipfs.sphn.link/burger-hotdog.png"
        alt="food"
        className="w-full h-32 bg-center bg-contain"
      />
      <section className="p-4 text-zinc-900">
        <div className="font-bold">{restaurant.name}</div>
        <div className="text-sm mb-2 h-20">{restaurant.description}</div>
        <ul>
          {restaurant.menu.map((dish: any, i: number) => (
            <li key={i} className="text-sm">
              - {dish.name}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default RestaurantCard;
