import { Router } from 'express'



import cartManager from '../classes/cartManager.js'

const router = Router()
let cartManager1 = new cartManager()  


router.get('/', (request, response) =>{
    
    let limit = request.query.limit
    cartManager1.getCarts().then((element)=> response.send(element))

})

router.get('/:id', (request, response) =>{
    const id = parseInt(request.params.id)
      
    cartManager1.getCartById(id).then((element)=> response.send(element))
})

router.post('/', async (req, res) => {
    const newCart = await cartManager1.create()
    res.json({status:"success", newCart})
})

router.post('/:cid/product/:pid', async(req, res) =>{
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const cart = await cartManager1.addProduct(cid, pid)
    res.json({status:"success", cart})
   
})


export default router