const express = require("express");
const mongoose = require("mongoose");
const authroutes = require("./Routes/AuthRoutes.js");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://manojkumarcse123:DGQeSSAjcXwAKZw8@cluster0.l7tuz8c.mongodb.net/ecommerce"
  )
  .then(() => {
    console.log("db connected");
  });

app.use("/", authroutes);

app.listen(5000, () => {
  console.log("server starting.....");
});
