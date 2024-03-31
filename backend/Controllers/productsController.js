const Address = require("../Model/Address.js");
const CartModel = require("../Model/CartModel.js");
const Ordermodel = require("../Model/Ordermodel.js");
const productModel = require("../Model/ProductModel.js");
const User = require("../Model/User.js");

exports.Product = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
      img1,
      img2,
      img3,
      img4,
    } = req.body;
    const newuser = new productModel({
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
      img1,
      img2,
      img3,
      img4,
    });
    await newuser.save();
    return res.status(200).json({ message: "product is added" });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const exist = await productModel.find();
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};
exports.cart = async (req, res) => {
  try {
    const { title, description, price, rating, brand, category, thumbnail,count } =req.body;
   // const exist = await OrderModel.findById(req.user.id);
   console.log(req.user.id);
    let newuser = new CartModel({
      user: req.user.id,
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
      count
    });
    await newuser.save();
    return res.json({ message: "added in cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};


exports.getcart = async (req, res) => {
  try {
   const exist = await CartModel.find();
   const map=exist.filter((each)=>each.user == req.user.id)
    res.json(map);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "again login" });
  }
};

exports.deletecart = async (req, res) => {
  try {
   await CartModel.findByIdAndDelete(req.params.id);
 return res.status(200).json({message:"sucessfully product is removed"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "again login" });
  }
};

exports.address = async (req, res) => {
  try {
  const {address,city,pin}=req.body
  if(!address || !city || !pin){
    return res.status(400).json({message:"Please fill form"})
  }
  const newuser=new Address({
    user: req.user.id,
    address,city,pin
  })
  await newuser.save()
 return res.status(200).json({message:"we have consider our address move to next step"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "again login" });
  }
};

exports.getaddress = async (req, res) => {
  try {
   const exist = await Address.find();
   const map=exist.filter((each)=>each.user == req.user.id)
    res.json(map);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "again login" });
  }
};

exports.deleteaddress = async (req, res) => {
  try {
   await Address.findByIdAndDelete(req.params.id);
 return res.status(200).json({message:"sucessfully address deleted"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "again login" });
  }
};
exports.orders = async (req, res) => {
  try {
    const { title, description, price, rating, brand, category, thumbnail } =req.body;
   // const exist = await OrderModel.findById(req.user.id);
   //console.log(req.user.id);
    let newuser = new Ordermodel({
      user: req.user.id,
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
    });
    await newuser.save();
    return res.json({ message: "sucessfully ordered" });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};
exports.getorders = async (req, res) => {
  //const exist = await OrderModel.findById(req.user.id);
  try {
   // console.log(req.user.id);
   const exist = await Ordermodel.find();
   const map=exist.filter((each)=>each.user == req.user.id)
   return res.json(map);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
exports.profiledelte=async(req,res)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "sucessfully deleted your account" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}
exports.proedit=async(req,res)=>{
  const {username,email}=req.body
  try {
    await User.findByIdAndUpdate(req.params.id,{username,email})
    return res.status(200).json({ message: "sucessfully updated your account" });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "server error" });
  }
}