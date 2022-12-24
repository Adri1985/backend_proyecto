import { Router } from 'express'



import productManager from '../classes/productManager.js'

const router = Router()
let productManager1 = new productManager()  


router.get('/', (request, response) =>{
    
    let limit = request.query.limit
    productManager1.getProducts().then((element)=> response.send(limit? element.slice(0,limit): element))

})

router.get('/:id', (request, response) =>{
    const id = request.params.id
      
    productManager1.getProductById(id).then((element)=> response.send(element))
})

router.post('/', async (req, res) => {
    const {code,title, description, price, thumbnail, stock} = req.body
    console.log(await productManager1.getProducts())
    console.log(code+title+description+price+thumbnail+stock)
    await productManager1.addProduct(code, title, description, price, thumbnail, stock)

    res.send({status: 'success'})
})

router.put('/:id', async(req, res) =>{
    const id = parseInt(req.params.id)
    const dataUPD = req.body

    const result = await productManager1.updateProduct(id, dataUPD)

    res.json({status:"success", result})
})


export default router