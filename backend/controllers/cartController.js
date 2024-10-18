import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req,res) => {
    try {
        //it is the all the data of the user
        let userData  = await userModel.findById(req.body.userId);
        //we will extract the cart data
        let cartData  = await userData.cartData;
        //we will modify the data

        //it will create a new entry if there is no cart item present 
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else{
            cartData[req.body.itemId] += 1;
        }
        //we need to update the data of the user
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// Remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        // we will get the user id from middleware that will decode our token as id of a particular item
        let userData = await userModel.findById(req.body.userId);
        //we need to extract the cart data
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// Fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export { addToCart,removeFromCart,getCart }