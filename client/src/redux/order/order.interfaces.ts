export interface IOrderState {
  orders: IRestaurantOrder[];
  total: number;
}

export interface IRestaurantOrder {
  restaurantId: string;
  restaurantName: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
