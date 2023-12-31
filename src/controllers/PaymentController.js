import { StatusCodes } from "http-status-codes";
import PaymentModel from "../models/PaymentModel.js";
import Stripe from "stripe";

const stripe = Stripe("sk_test_51N95AXSARt03c6c9ZxzE47HlnONBrXnsyKaiHADxONZ048sFjtK6g7OXpHU6Bi4Q2iWvGzPioNPvubtA1ZPvUo3N00xCkTxrnW")

export async function postPayment(req, res) {
    try {
      const { amount , userId,cartId, cart_Id} = req.body

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: 'Premium Blogs Subscription',
                  },
                  unit_amount: req.body.amount*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `https://shopping-cart-app-ashen.vercel.app/checkout-success?userId=${userId}&amount=${amount}&cart_Id=${cart_Id}`,
            cancel_url: "https://shopping-cart-app-ashen.vercel.app/"
          });
        // console.log('stripe response', session)
        // console.log("response url", session.url)

          // store payment details in database


          const payment = PaymentModel({amount, userId, transactionId:session.id,cartId,cart_Id})

          const savedPaymentDetails = await payment.save()
          console.log("payment details", savedPaymentDetails)

          res.send({url: session.url});
        
      
    } catch (error) {
        console.log("error in post payment", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in post payment"})
    }
}


export async function fetchPayment(req,res){
  try {
    const payment = await PaymentModel.find().populate('userId')
    return res.status(StatusCodes.OK).json({data:payment, message:"payment fetch successfully", success:true})
  } catch (error) {
    console.log("error in fetching payment", error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching payment", success:false})
  }
}
   
        
