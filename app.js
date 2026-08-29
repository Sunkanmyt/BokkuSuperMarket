const express = require("express");
const app = express();

// Importing all required modules and dependencies
const dotenv = require("dotenv");
const connectToDB = require("./Config/databaseConfig");

const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");

app.use(express.json()); // Setting up the middleware

app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Using dotenv to load environment variables from a .env file into process.env
dotenv.config();

// Connecting to the database
connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
