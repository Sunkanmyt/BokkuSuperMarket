const express = require("express");
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});

app.get("/products", (req, res) => {
  res.json([
    {
      name: "MacBook Pro M5 Pro",
    },
  ]);
});
