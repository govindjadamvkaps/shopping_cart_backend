import express from 'express'
import { fetchPayment, postPayment } from '../controllers/PaymentController.js'


const PaymentRouter = express()

PaymentRouter.post('/create-checkout-session',postPayment)
PaymentRouter.get('/get-payment',fetchPayment)

export default PaymentRouter