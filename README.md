# Mozata
A web-based food marketplace that allows users to browse restaurant listings, view dishes offered by each restaurant, log in, add dishes to a cart, and execute orders.

## Technologies Used
- ReactJS
- Redux
- NodeJS
- Express
- MongoDB
- Tailwind

## Installation
To run Mozata, follow the steps below:

### Client
You can follow these steps to setup the client:
1. Install `Node 16.x` either manually or using a tool like nvm (recommended)
2. Clone this repo.
3. Go inside the `client` directory
4. Run `yarn` to install dependencies
5. Create a `.env` file in the client directory and Add the following:
  ```
  # for local setup use http://localhost:8111
  REACT_APP_MARKETPLACE_SERVER=xxxx
  ```
6. Start the client
  ```sh
  yarn start
  ```

### Server
You can follow these steps to setup the server:

1. Install `Node 16.x` either manually or using a tool like nvm (recommended)
2. Clone this repo.
3. Go inside the `server` directory
4. Run `yarn` to install dependencies
5. Create a `.env` file in the server directory and Add the following:
  ```
  PORT=8111
  MONGODB_URI=xxxx
  JWT_SECRET_KEY=xxxx
  JWT_EXPIRES_IN=1h
  SESSION_SECRET_KEY=xxxx
  # for local setup use http://localhost:3000
  CORS_ORIGIN=xxxx
  ```
6. Start the server
  ```sh
  yarn start
  ```

## Version History
* 0.1
    * Initial Release

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.
