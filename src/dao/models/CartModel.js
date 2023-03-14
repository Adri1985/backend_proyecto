import cartModel from '../models/cart.model.js'
import mongoose from 'mongoose'

class CartModel{
    constructor(){
    }
    getAll = async()=>{
        const result = await cartModel.find().lean().exec()
        return result
    }

    createOne = async(cartData)=>{
        const result = await cartModel.createOne(cartData)
        return result
    }

    updateOne = async(id, updCart)=>{
        const result = await cartModel.updateOne({_id:id}, updCart)
        return result
    }

    addProductToCart = async(cartID,cart, productID,qty)=>{
        const mongooseCartID = mongoose.Types.ObjectId(cartID)
        const mongooseProductID = mongoose.Types.ObjectId(productID)
        cart.products.push({product: mongooseProductID, quantity: qti||1})
        const result = this.updateOne({_id:mongooseCartID}, cart)
        return result
    }

    getOne = async(id)=>{
        const mongooseCartID = mongoose.Types.ObjectId(id)
        const result = await cartModel.findOne({_id: id}).lean.exec()
        return result
    }

    deleteOne = async(id)=>{
        const result = await cartModel.deleteOne({_id:id})
        return result
    }

}

export default CartModel