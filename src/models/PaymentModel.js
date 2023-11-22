import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    transactionId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      cartId:{
        type:Object
      },
      cart_Id:{
        type:String
      }
},{
    timestamps:true
})


const PaymentModel= new mongoose.model('payment', paymentSchema)

export default PaymentModel