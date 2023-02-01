import { response, Router } from 'express'

import mongoose from 'mongoose'



import cartManager from '../dao/db/cartManager.js'

const router = Router()
let cartManager1 = new cartManager()  


router.get('/', (request, response) =>{
    

    console.log("entra en /")
    cartManager1.getCarts().then((element)=> response.send(element))

})

router.get('/:id', (request, response) =>{
    console.log("entra en /:id")
    const id = request.params.id
      
    cartManager1.getCartById(id).then((element)=> response.send(element))
})

router.get('/viewCart/:id', (request, response) =>{
    console.log("entra en /:id")
    const id = request.params.id
      
    cartManager1.getCartById(id).then((element)=> {

        console.log("element", element)

        response.render('cart',element)
    })   
})

router.post('/', async (req, res) => {
    const newCart = await cartManager1.create()
    res.json({status:"success", newCart})
})

router.post('/:cid/product/:pid', async(req, res) =>{
    console.log("entra a api carts")
    const cid = mongoose.Types.ObjectId(req.params.cid)
    const pid = mongoose.Types.ObjectId(req.params.pid)
    const quantity = parseInt(req.body.quantity)
    console.log("quantity", quantity)
    const cart = await cartManager1.addProduct(cid, pid, quantity)
    res.json({status:"success", cart})
})

router.delete('/:cid/products/:pid', async(req,res)=>{
    console.log("entra al endpoint")
    const cid = req.params.cid 
    const pid = req.params.pid
    const result = await cartManager1.deleteProdFromCart(cid, pid).then((element)=> res.send(element))

})

router.put('/:cid', async(req,res)=>{
    const cid = req.params.cid 

    console.log("cid", cid);
    const products = req.body
    console.log(products)
    const result = await cartManager1.updateProductsOnCart(cid, products).then((element)=> res.send(element))

})

router.put('/:cid/products/:pid', async(req,res)=> {

 
    const quantityObj = req.body
    const pid = req.params?.pid
    const cid = req.params?.cid
    const result = await cartManager1.updateProductQuantity(cid, pid, quantityObj.quantity).then((element)=> res.send(element))

})

router.delete('/:cid', async(req,res)=>{
    const cid = req.params?.cid
    const result = await cartManager1.deleteProductsFromCart(cid).then((element)=> res.send(element))
})




export default router