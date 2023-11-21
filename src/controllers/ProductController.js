import { StatusCodes } from "http-status-codes";
import { ProductModel } from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";


export async function saveProduuct(req, res) {
    try {
        // console.log(req.body)
        const pImage = (req.file) ? req.file.filename : null
        // console.log("image",pImage)
        const { pName, pCategory, pPrice, pDescription, categoryId } = req.body


        const user = await CategoryModel.findById(categoryId)
        // console.log(user)

        const product = new ProductModel({ pName, pCategory, pPrice, pDescription, pImage, categoryId })
        const savedPost = await product.save()

        user.productId.push(savedPost._id)
        await user.save()

        res.status(StatusCodes.CREATED).json({ data: savedPost, message: "post saved successfuly ", success: true })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in saving post", success: false })
    }
}


export async function fetchAllProduct(req, res) {
    try {
        const product = await ProductModel.find().populate('categoryId')
        res.status(StatusCodes.OK).json({ data: product, message: "data fetch successfully", success: true })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching data" })
    }
}


export async function fetchProductById(req, res) {
    try {
        const product = await ProductModel.findById(req.params.id).populate('categoryId')
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error in fetching product by Object id" })
    }
}


// export const fetchProductByCategory = async (req, res) => {
//     try {
//         // console.log("category data", req.params.category)
//         const product = await ProductModel.find({ category: req.params.category })
//         res.status(StatusCodes.OK).json({ data: product, message: "data fetched by category", success: true })
//     } catch (error) {
//         console.log('error in fetching data by category ', error)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching data by category Id" })
//     }
// }


export async function fetchProductByCategoryId(req,res){
    try {
        const product = await ProductModel.find({categoryId:req.params.id})
        // console.log("predfdfsa", product)
        res.status(StatusCodes.OK).json({data:product, message:"data fetched by CategoryId" , success:true})
    } catch (error) {
        console.log("error in find product by category id", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in find product by categoryId"})
    }
}





export async function productMen(req, res) {
    try {
        const product = await ProductModel.find({ categoryId: "6481778f84241f241e000daa" })
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching data by category Id" })
    }
}

export async function productWomen(req, res) {
    try {
        const product = await ProductModel.find({ categoryId: "648177b984241f241e000e59" })
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching data by category of women" })
    }
}

export async function productChildren(req, res) {
    try {
        const product = await ProductModel.find({ categoryId: "648177c584241f241e000e5b" })
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching data by category Id" })
    }
}



export async function findByIdAndDelete(req, res) {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.NO_CONTENT).json({ message: "product deleted successful" })

    } catch (error) {
        console.log('error in deleting product', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in deleting product" })
    }
}


