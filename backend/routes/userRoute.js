import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"


// Now we will make a router 
const userRouter = express.Router();


//end points
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)




export default userRouter;