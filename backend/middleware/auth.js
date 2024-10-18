import jwt from  "jsonwebtoken"


//The middleware will take the token and convert it to userid,and using that userid we can add remove and get the cart
const authMiddleware = async (req,res,next) => {
    //tke the token from user
    const {token} = req.headers;
    //if we don't get any token then we will display this message
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    //if we have the token then we need to decode the token
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;