import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    // productId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'product'
    // }
    productId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

const WishListModel = new mongoose.model('wishlist',wishListSchema)

export default WishListModel;