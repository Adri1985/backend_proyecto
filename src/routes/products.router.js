import { Router } from 'express'

import querystring from 'querystring'


import productManager from '../dao/db/productManager.js'

const router = Router()
let productManager1 = new productManager()  

//para conectar desde react despues
/*router.get('/view', (request, response) =>{
    console.log("entra al endpoint /")
    
    let limit = request.query?.limit|| 10
    let page = request.query?.page|| 1
    let orden = request.query?.orden|| 1
    const filter = request.query?.filter || ''

    const filterObj = JSON.parse(JSON.stringify(querystring.parse(filter)))
    console.log("Filtro", filterObj)

    const options = {limit, page, lean:true, sort:{price: orden}}  


    productManager1.getProductsDB(filterObj, options).then(elements =>{
        
        let  {totalPages, prevPage, nextPage, page,hasPrevPage, hasNextPage} = elements    
        let objectResponse = {totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage}
        objectResponse.result = elements.totalDocs>0? "Success": "Failure"
        objectResponse.payload = elements.docs
        objectResponse.prevLink = hasPrevPage? `/api/products?page=${prevPage}`:''
        objectResponse.nextLink = hasNextPage? `/api/products?page=${nextPage}`:''
        console.log("result", objectResponse)
        objectResponse.user = request.session.user
        response.render('products', objectResponse)
        //response.render('index', objectResponse, {helpers: { json: function (context) { return JSON.stringify(context);  } }});
        console.log("products en api", elements)
        console.log("user ", request.session.user)
    })

})*/
router.get('/', (request, response) =>{
    console.log("entra al endpoint /")
    
    let limit = request.query?.limit|| 10
    let page = request.query?.page|| 1
    let orden = request.query?.orden|| 1
    const filter = request.query?.filter || ''

    const filterObj = JSON.parse(JSON.stringify(querystring.parse(filter)))
    console.log("Filtro", filterObj)

    const options = {limit, page, lean:true, sort:{price: orden}}  


    productManager1.getProductsDB(filterObj, options).then(elements =>{
        
        let  {totalPages, prevPage, nextPage, page,hasPrevPage, hasNextPage} = elements    
        let objectResponse = {totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage}
        objectResponse.result = elements.totalDocs>0? "Success": "Failure"
        objectResponse.payload = elements.docs
        objectResponse.prevLink = hasPrevPage? `/api/products?page=${prevPage}`:''
        objectResponse.nextLink = hasNextPage? `/api/products?page=${nextPage}`:''
        console.log("result", objectResponse)
        objectResponse.user = request.session.user
        response.render('products', objectResponse)
        //response.render('index', objectResponse, {helpers: { json: function (context) { return JSON.stringify(context);  } }});
        console.log("products en api", elements)
        console.log("user ", request.session.user)
    })

})

router.get('/:id', (request, response) =>{
    const id = request.params.id 
    productManager1.getProductById(id).then((element)=> response.render('product',element))
})

router.post('/', async (req, res) => {
    //console.log(await productManager1.getProducts())
   // console.log(code+title+description+price+thumbnail+stock)
    await productManager1.addProductDB(req.body)

    res.send({status: 'success'})
})

router.put('/:id', async(req, res) =>{
    const id = req.params.id
    const dataUPD = req.body

    const result = await productManager1.updateProduct(id, dataUPD)

    res.json({status:"success", result})
})

router.delete('/:id', async(req, res) => {
    const pid = req.params.id
    const result = await productManager1.deleteProduct(pid)
    res.send({status: "success", payload: result})
})

export default router