const express = require("express");
const app = express();

// Using dotenv to load environment variables from a .env file into process.env
const dotenv = require("dotenv");
dotenv.config();

// Importing all required modules and dependencies
const connectToDB = require("./Config/databaseConfig");

const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");

// Setting up the middleware
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Connecting to the database
connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
