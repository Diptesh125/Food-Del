import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req,res) => {
    //using image_filename we can store the image
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price: req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save()
        res.json({success:true,message:"Food Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

//all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// Remove food item
const removeFood = async (req,res) => {
    try {
        //to find the food model using the id
        const food = await foodModel.findById(req.body.id);
        //for removing the image we need to unlink the image
        fs.unlink(`uploads/${food.image}`,()=>{})
        //Delete the food model using the id
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}






export {addFood,listFood,removeFood}