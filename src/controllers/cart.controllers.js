import CartService from '../services/cart.service.js'



const cartService = new CartService()

export const getAll= async(req,res)=>{
    const result = await cartService.getAll()
    res.json(result)
}
export const getOne= async(req,res)=>{
    const cid = req.params.cid
    const result = await cartService.getOne(cid)
    res.json(result)
}

export const createOne=async(req,res)=>{
    const result = await cartService.createOne(req.user.id)
    res.json(result)
}

export const updateOne= async(req,res)=>{
    const cid = req.params?.id
    const updCart = req.body
    updCart.user = req.user.id
    const result = await cartService.updateOne(cid, updCart)
    res.json(result)
}

export const addProductToCart = async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = parseInt(req.body.quantity)
    const result = await cartService.addProductToCart(cid, pid, quantity)
    res.json(result)
}

export const deleteProductFromCart = async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cartService.deleteProductFromCart(cid, pid)
    res.json(result)
}

export const updateProductsOnCart = async(req,res)=>{
    const cid = req.params.cid
    const products = req.body
    const result = await cartService.updateProductsOnCart(cid, products)
    res.json(result)
}

export const updateProductQuantity = async(req,res)=>{
    const quantityObj = req.body
    const pid =req.params?.pid
    const cid = req.params?.cid
    const result = await cartService.updateProductQuantity(cid, pid, quantityObj)
    res.json(result)
}

export const deleteOne = async(req,res)=>{
    const cid = req.params?.cid
    const result = await cartService.deleteOne(cid)
    res.json(result)
}