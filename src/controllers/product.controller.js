import ProductService from '../services/product.service.js'

const productService = new ProductService(); 

export const getAll =async(req,res) =>{
    const result =await productService.getAll(req.query)
    res.json(result)
}

export const getOne = async(req,res)=>{
    const id = req.params?.id;
    const result = await(productService.getOne(id))
    res.json(result)
}

export const createOne = async(req,res) =>{
    const product = req.body
    const result = await productService.createOne(product)
    res.json(result)
}

export const updateOne= async(req,res)=>{
    const id = req.params.id
    const dataUPD = req.body
    const result = await productService.updateOne(id, dataUPD)
    res.json({status:"success", result})
}

export const deleteOne = async(req,res) =>{
    const id = req.params.id
    const result = await productService.deleteOne(id)
    res.json({status:"success", payload: result})
} 
