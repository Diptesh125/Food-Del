import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder } from "../controllers/orderController.js"

// Creating a router because we can create multiple end points using this router:-
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)

export default orderRouter;