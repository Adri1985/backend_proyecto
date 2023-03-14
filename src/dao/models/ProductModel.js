import productModel from '../models/product.model.js'

class ProductModel {
    constructor (){
        
    }

    getAll =async(search, options)=>{
        return productModel.paginate(search, options)
    }

    getOne=async(id)=>{
       const productFound = await productModel.findOne({_id:id}).lean().exec()
       return productFound
    }

    updateOne=async(id, updProduct)=>{
        const result = await productModel.updateOne({_id:id}, updProduct)
        return result
    }

    createOne = async(product) =>{
        const result = await productModel.create(product)
        return result
    }

    deleteOne = async(id)=>{
        const result = await productModel.deleteOne({_id: id})
        return result
    }
    
        
}


export default ProductModel