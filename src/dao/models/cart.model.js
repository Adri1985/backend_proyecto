import mongoose from "mongoose"

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: []
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel