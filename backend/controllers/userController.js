import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res) => {
    const { email,password } = req.body;
    try {
        const user = await userModel.findOne({email});
        // If we don't get the user available
        if (!user) {
            return res.json({success:false,message:"User Doesn't exist"})
        }
        //if we get the user then:-
        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        // is the password is matched then we will generate one token
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//for creating the Token for user
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //checking is the user already exist or not by finding them by thir email
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false,message:"User already exist"})
        }
        
        //validating email format & strong password
//if email is not valid then:-
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating a new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        //Generate 1 token
        const token = createToken(user._id)
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser};