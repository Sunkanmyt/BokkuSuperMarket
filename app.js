// Importing all required modules and dependencies
const dotenv = require("dotenv");
const productRoutes = require("./Routes/ProductRoute");
const connectToDB = require("./Config/databaseConfig");
const express = require("express");
const app = express();

app.use(express.json()); // Setting up the middleware
app.use("/products", productRoutes);

// Using dotenv to load environment variables from a .env file into process.env
dotenv.config();

// Connecting to the database
connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
