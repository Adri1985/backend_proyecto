import mongoose from "mongoose"

import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({

    
            title : String,
            description : String,
            price : Number,
            thumbnail : String,
            stock : Number
})

productSchema.plugin(mongoosePaginate)
const prouctModel = mongoose.model(productCollection, productSchema)

export default prouctModel