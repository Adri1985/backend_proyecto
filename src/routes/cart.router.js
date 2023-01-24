import { Router } from 'express'

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
    const id = parseInt(request.params.id)
      
    cartManager1.getCartById(id).then((element)=> response.send(element))
})

router.post('/', async (req, res) => {
    const newCart = await cartManager1.create()
    res.json({status:"success", newCart})
})

router.post('/:cid/product/:pid', async(req, res) =>{
    const cid = mongoose.Types.ObjectId(req.params.cid)
    const pid = parseInt(req.params.pid)
    const cart = await cartManager1.addProduct(cid, pid)
    res.json({status:"success", cart})
})


export default router