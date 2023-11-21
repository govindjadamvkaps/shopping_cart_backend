import { fetchAllProduct ,  fetchProductByCategoryId, fetchProductById, findByIdAndDelete, productChildren, productMen, productWomen, saveProduuct } from "../controllers/ProductController.js";
import multer from "multer";
import express from "express";


const ProductRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/images')
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})

ProductRouter.post('/products',upload.single('pImage') , saveProduuct)
ProductRouter.get('/products', fetchAllProduct)  

ProductRouter.get('/products/single/:id', fetchProductById)
// ProductRouter.get("/products/:category",fetchProductByCategory)
ProductRouter.get("/products/:id",fetchProductByCategoryId)
ProductRouter.get('/products/category/6481778f84241f241e000daa', productMen)
ProductRouter.get('/products/category/648177b984241f241e000e59', productWomen)
ProductRouter.get('/products/category/648177c584241f241e000e5b', productChildren)
ProductRouter.delete('/products/delete/:id',findByIdAndDelete)

export default ProductRouter