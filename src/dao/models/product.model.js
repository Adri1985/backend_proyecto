import mongoose from "mongoose"

const productCollection = 'products'

const productSchema = new mongoose.Schema({

    
            title : String,
            description : String,
            price : Number,
            thumbnail : String,
            stock : Number
})

const prouctModel = mongoose.model(productCollection, productSchema)

export default prouctModel