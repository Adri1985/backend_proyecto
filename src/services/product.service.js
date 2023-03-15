import Product from '../dao/db/Product.js'

import ProductModel from '../dao/models/ProductModel.js'

import querystring from 'querystring'




class productService{
    constructor()
    {
       this.productModel = new ProductModel()

    }
    setProducts =(products)=>{
        this.products = products
    }
        // constructor por parametros
    addProduct = async( product) =>{
        const result = await productModel.create(product)
        return (result)
    }   
    // constructor por objeto Product
    validateProduct = (product) =>{
        console.log("product ", product)
        const {id, marca, modelo, tipo, rango, topFeature1, topFeature2, topFeature3, imageName, liked, stock, onCart} = product
        //return (id&& marca&& modelo&& tipo&& rango&& topFeature1&& topFeature2&& topFeature3&& imageName&& liked&& stock&& onCart)
        return true
    }

    createOne = async( product) =>{   // DEJO LAS VALIDACIONES QUE EXISTIAN
        if(this.validateProduct(product)){
            const result = await this.productModel.createOne(product)
            return result
        }
        else{
            console.log("all fields are mandatory, product not added")
            return({})
        }
    }  
    
  
    deleteOne= async(id) =>{
        const result = await this.productModel.deleteOne(id)
        return (result)
    }   

    getAll = async(query) =>{
        const {limit, page, orden, filter}= query
        const options = {limit:10,page: 1, lean:true, sort:{price:1}}
        const filterObj = JSON.parse(JSON.stringify(querystring.parse(query.filter))) 
        const productsPaginated = await this.productModel.getAll(filterObj, options )
        return(productsPaginated.docs)
        
    }
    getOne = async(id) => {
        const result = await this.productModel.getOne(id)
        return result
    }
    updateOne = async(id, updProduct)=>{
        return this.productModel.updateOne(id, updProduct)
    }

}
export default productService

