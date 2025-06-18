let mongoose = require("mongoose");
let exp = require("express");
let explayout = require("express-ejs-layouts");
let User = require("./models/User");
let Product = require("./models/Product");
let Cart = require("./models/Cart");
let bcrypt = require("bcrypt");
const session = require('express-session');
const flash = require('connect-flash');
let server = exp();

// Middleware
server.use(exp.urlencoded({ extended: true }));
server.use(exp.json());
server.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
server.use(flash());
server.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
server.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAdmin = req.session.user && req.session.user.roles.includes("admin");
  next();
});

server.use(exp.static("public"));
server.use(explayout);
server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("Home");
});

server.get("/login", (req, res) => {
    res.render("login");
});

server.get("/CV", (req, res) => {
    res.render("CV", {layout: false});
});

server.get("/LandingPage", (req, res) => {
    Product.find().then(products => {
        res.render("LandingPage", { products });
    });
});

server.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.flash("success", "Logged in Successfully");
    return res.redirect("/LandingPage");
  } else {
    req.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});

server.get("/register", function (req, res, next) {
  return res.render("register");
});

server.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/LandingPage");
});

server.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    req.flash("danger", "User with given email already registered");
    return res.redirect("/register");
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();
  return res.redirect("/login");
});

server.get("/admin", (req, res) => {
//   if (!req.session.user || !req.session.user.roles.includes("admin")) {
//     return res.redirect("/login");
//   }
  Product.find().then(products => {
    res.render("admin", { products });
  });
});

server.get("/create", (req, res) => {
    res.render("create");
});

server.post("/create", async function (req, res) {
    const { name, price, image } = req.body;
    const product = new Product({ name, price, image });
    await product.save();
    res.redirect("/admin");
});

server.get("/cart", (req, res) => {
    Cart.find({ userId: req.session.user._id })
        .populate('productId')
        .then(cart => {
            res.render("cart", { cart });
        });
});
server.post("/cart", async (req, res) => {
    const { productId, name, image, price } = req.body;

    const cartItem = new Cart({
        userId: req.session.user._id,
        productId,
        name,
        image,
        price
    });
    await cartItem.save();
    res.redirect("/cart");
});

mongoose.connect("mongodb://localhost:27017/project").then(() => {
  console.log("connected to db");
});

server.listen(5000, () => {
    console.log("Server started at port 5000")
});