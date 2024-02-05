export interface IDishState {
  searchResults: IDish[];
}

export interface IDish {
  name: string;
  description: string;
  price: string;
  quantity: string;
}
