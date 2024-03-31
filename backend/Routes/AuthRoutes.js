const express = require("express");
const {
  Register,
  Login,
  allUser,
} = require("../Controllers/AuthController.js");
const { middleware } = require("../Middleware/Middleware.js");
const {
  Product,
  getProduct,
  cart,
  getcart,
  deletecart,
  address,
  getaddress,
  deleteaddress,
  orders,
  getorders,
  profiledelte,
  proedit,
} = require("../Controllers/productsController.js");
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/product", Product);
router.get("/getproduct", middleware, getProduct);
router.get("/user", middleware, allUser);
router.post("/cart", middleware, cart);
router.get("/getcart", middleware, getcart);
router.get("/getaddress", middleware, getaddress);
router.post("/address", middleware, address);
router.delete("/deleteaddress/:id", middleware, deleteaddress);
router.delete("/deletecart/:id", middleware, deletecart);
router.post("/orders", middleware, orders);
router.get("/getorders", middleware, getorders);
router.delete("/prodelte/:id", middleware, profiledelte);
router.patch("/proedit/:id", middleware, proedit);
module.exports = router;
