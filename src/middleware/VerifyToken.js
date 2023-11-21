import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js'
import { StatusCodes } from 'http-status-codes'

const tokenFunction = async(req,res,next)=>{
    try {
        const auth = req.header("Authorization")
        console.log("auth" , auth)
        if(!auth)
        {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Token not provided"})

        }
        const token = auth.replace("Bearer ","")
        console.log("tokennn", token)
        
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        console.log("verifyy", verify)
        
        const user = await UserModel.findById(verify._id)
        console.log("userrr", user)

        if(!user)
        {
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"error in token verification"})
        }
        else{
            req.user=user
            req.token= token
            next()
        }

    } catch (error) {
        console.log("error in token verification", error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in token verification"})
    }
}

export default tokenFunction