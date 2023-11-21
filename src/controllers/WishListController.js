import { StatusCodes } from "http-status-codes";
import WishListModel from "../models/WishListModel.js";

export async function AddWishList(req, res) {
    try {
        const productId = req.body.productId
        const user = await WishListModel.findOne({ userId: req.body.userId })
        // console.log("userrr", user)

        if (!user) {
            const product = WishListModel(req.body)
            const saveProduct = await product.save()
            return res.status(StatusCodes.CREATED).json({ data: saveProduct, message: "product is add to wishlist", success: true })

        }

        const itemIndex = user.productId.findIndex((item)=>item==productId)        
        // console.log("indeddfsd", itemIndex)

        if(itemIndex==-1){
            user.productId.push(req.body.productId)
            const saveProduct = await user.save()
            return res.status(StatusCodes.CREATED).json({ data: saveProduct, message: "product is add to wishlist", success: true })
        }
        
        return res.status(StatusCodes.BAD_REQUEST).json({message:"product already in wishList"})

    } catch (error) {
        console.log("error in save product in wishList", error)
        return   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in save product in wishList", success: false })
    }
}

export async function fetchWishList(req, res) {
    try {
        const product = await WishListModel.findOne({ userId: req.params.userId }).populate('productId')
        return res.status(StatusCodes.OK).json({ data: product, message: "find wishlist product", success: true })
    } catch (error) {
        console.log("error in find wishlist product")
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in find wishlist product" })
    }
}


export async function deleteWishListProduct(req, res) {
    try {
        const userId = req.params.userId
        const pId = req.params.pId

        const wishList = await WishListModel.findOne({ userId: userId })

        if (!wishList) {
            return res.status(StatusCodes.OK).json({ message: "wishlist not found ", success: false })
        }

        const itemIndex = wishList.productId.findIndex(item => item == pId);

        if (itemIndex !== -1) {
            wishList.productId.splice(itemIndex, 1);
            await wishList.save()
            return res.status(StatusCodes.OK).json({ message: "cart item delete successfully" });
        }
        else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "wishlist not found for delete", success: false });
        }
        
    } catch (error) {
        console.log("error in delete product by wishlist", error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in delete product by wishlist" })
    }

}

