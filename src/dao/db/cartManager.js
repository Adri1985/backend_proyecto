
import fs from 'fs'

import cartModel from '../models/cart.model.js'

class cartManager{
    constructor()
    {
        this.carts = []
        this.filename = '../carts.json'

    }

    
 

    
    create = async() =>{
        const cartData = {products:[]}
        const result = await cartModel.create(cartData)
        console.log("result del create", result)
        return (result)
    
        }   
    
    updateCart =async(id, updData)=>{
        const result = await cartModel.updateOne({_id: id}, updData)
    }

    addProduct = async( cartID, productID, qty) =>{
        const cart = await cartModel.findOne({_id: cartID})
        console.log("qty", qty)

        cart.products.push({product: productID, quantity: qty||1})
        const result = await cartModel.updateOne({_id: cartID}, cart)
        return (result)
    }   
 

   

    getCarts = async() =>{
       const carts = await cartModel.find().lean().exec()
       return carts
        
    }

    getCartById = async(id) => {
        const cart = await cartModel.findOne({_id: id}).lean().exec() 
    }

    deleteProdFromCart= async(cid, pid) =>{
        let cartFound = await cartModel.findOne({_id: cid}).lean().exec()
      
        if (cartFound == undefined){
            console.log(`Cart ${cid} not found`)
            return({})
        }
        else{
            const cartProductsFiltered = cartFound.products.filter(prod => prod.product != pid)
            cartFound.products=cartProductsFiltered
            let result = await cartModel.updateOne({_id:cid}, cartFound)
        }
    }

    updateProductsOnCart = async(cid, products) => {
        let cartFound = await cartModel.findOne({_id: cid}).lean.exec()
        cartFound.products = products
        let result = await cartModel.updateOne({_id: cid}, cartFound)
        return (result)
    }

    updateProductQuantity= async(cid, pid, quantity)=>{
        let cartFound = await cartModel.findOne({_id: cid}).lean.exec()
        for (let i = 0; i< cartFound.products.lenght; i++){
            if(cartFound.products[i]._id = pid)
                cartFound.products[i].quantity = quantity
        }
        let result = await cartModel.updateOne({_id:id}, cartFound)
        return(result)
    }

    deleteProducsFromCart = async(cid) =>{
        let cartFound = JSON.stringify(JSON.parse(await cartModel.findOne({_id: cid}).lean.exec()))
        cartFound.products = []
        let result = await cartModel.updateOne({_id: cid}, cartFound)
        return(result)

    }
 
    
    
   
}
export default cartManager

//let productManager1 = new productManager();

/*productManager1.addProduct(123,"Meepo","Mini2", "Electric Skateboard",400, "./meepo.jpg", 10);
productManager1.addProduct(124,"Segway","Ninebot", "Electric Scooter",400, "./Ninebot.jpg", 10);
productManager1.addProduct(124,"Segway","Ninebot", "Electric Scooter",400, "./Ninebot.jpg", 10); // duplicado
productManager1.addProduct(125, "philco","S90", "Scooter", 500, "./philco.jpg", 20); // violacion de campos mandatorios

console.log(productManager1)
productManager1.getProductById(2) // muestro el producto segun el id si lo encuentra
productManager1.deleteProduct(1).then(console.log("termino el delete")) // elimino un producto


// cambio el objeto con ID 2 dentro del array de productos, 
//pasando como segundo parametro un objeto con clave valor
//cuando finaliza updateProduct, graba el array actualizado
productManager1.updateProduct(2,{description: "New Description"})

productManager1.updateProduct(2,{title: "New Title"})





//setTimeout(()=>console.log(productManager1.addProduct(126, "Meepo","Hurricane", "Electric Skateboard", 500, "./hurricane.jpg", 20)),2000)

 
*/
//productManager1.getProducts().then((element)=> console.log("products",element))
