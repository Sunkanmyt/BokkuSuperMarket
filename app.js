const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});

app.get("/products", (req, res) => {
  res.json([
    {
      name: "MacBook Pro M5 Pro",
    },
  ]);
});
