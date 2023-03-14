
import CartModel from '../dao/models/CartModel.js'

class CartService{
    constructor()
    {
        this.cartModel = new CartModel()
    }

    getAll = async() =>{
        const carts = await this.cartModel.getAll()
        return carts
         
     }
    
    createOne = async(user) =>{
        const cartData = {user: user, products:[]}
        const result = await this.cartModel.createOne()
        return result
        }   
    
    updateOne =async(id, updCart)=>{
        const result = await this.cartModel.updateOne(id, updCart)
    }

    addProductToCart = async( cartID, productID, qty) =>{
        const cart = this.getOne(cartID)
        const result = await cartModel.updateOne({_id: cartID}, cart)
        return (result)
    }   
 
    getOne = async(id) => {
        const result = await this.cartModel.getOne(id) 
        return result
    }

    deleteProdFromCart= async(cartID, productID) =>{
        const newCart = this.getOne(cartID)
        if (newCart == undefined){
            return({error:`Cart ${cartID} not found`, payload:{}})
        }
        else{
            const cartProductsFiltered = newCart.products.filter(prod => prod.product != productID)
            newCart.products=cartProductsFiltered
            const result = await this.updateOne(cartID, newCart)
            return result
        }
    }

    updateProductsOnCart = async(cid, products) => {
        const cartFound = await this.getOne(cid)
        cartFound.products = products
        const result = await this.updateOne(cid, cartFound)
        return result
    }

    updateProductQuantity= async(cid, pid, quantity)=>{
        let cartFound = await this.getOne(id)
        for (let i = 0; i< cartFound.products.length; i++){
            if(cartFound.products[i].product == pid){
                cartFound.products[i].quantity = quantity
            }
        }    
        const result = await this.updateOne(cid, cartFound)
        return result
    }

    deleteProductsFromCart = async(cid) =>{
        let cartFound = await this.getOne(cid)
        cartFound.products = []
        let result = this.updateOne(cid,cartFound)
        return result
    } 

    deleteOne = async(cid)=>{
        const result = this.cartModel.deleteOne(cid)
        return result
    }
   
}
export default CartService

