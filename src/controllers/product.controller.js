import ProductManager from '../manager/product.manager.js'

const productManager = new ProductManager(); 

export const getAll =async(req,res) =>{
    console.log("User en endpoint", req.user)
    const result =await productManager.getAll(req.query)
    console.log("result del manager get all ", result)
    const payload ={products:result, user:req.user}
    console.log(result)
    console.log("payload", payload)
    res.json(payload)
}

export const getOne = async(req,res)=>{
    const id = req.params?.id;
    const result = await(productManager.getOne(id))
    res.json(result)
}

export const createOne = async(req,res) =>{
    const product = req.body
    const result = await productManager.createOne(product)
    res.json(result)
}

export const updateOne= async(req,res)=>{
    const id = req.params.id
    const dataUPD = req.body
    const result = await productManager.updateOne(id, dataUPD)
    res.json({status:"success", result})
}

export const deleteOne = async(req,res) =>{
    const id = req.params.id
    const result = await productManager.deleteOne(id)
    res.json({status:"success", payload: result})
} 
