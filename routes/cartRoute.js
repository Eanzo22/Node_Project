const express = require("express");
const cartController = require("../controllers/cartControllerDB");
const cartRouter = express.Router();

// cartRouter.get("/api/v1/cart", cartController.getUserCart);
// cartRouter.post("/api/v1/cart/add", cartController.addNewProToUserCart);
// cartRouter.put("/api/v1/cart/:proId", cartController.updateProInUserCart);
// cartRouter.delete("/api/v1/cart/:proId", cartController.deleteOneProductFromUserCart);
// cartRouter.delete("/api/v1/cart/clear", cartController.deleteAllUserCart);

cartRouter.get("/", cartController.getUserCart);
cartRouter.get("/add", cartController.addNewProToUserCart);
cartRouter.post("/add", cartController.addNewProToUserCart);
cartRouter.put("/:myObj", cartController.updateProInUserCart);
cartRouter.delete("/clear", cartController.deleteAllUserCart);
cartRouter.delete("/:myObj", cartController.deleteOneProductFromUserCart);

module.exports = cartRouter;
