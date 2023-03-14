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

//let productManager1 = new productManager();

/*productManager1.addProduct(123,"Meepo","Mini2", "Electric Skateboard",400, "./meepo.jpg", 10);
productManager1.addProduct(124,"Segway","Ninebot", "Electric Scooter",400, "./Ninebot.jpg", 10);
productManager1.addProduct(124,"Segway","Ninebot", "Electric Scooter",400, "./Ninebot.jpg", 10); // duplicado
productManager1.addProduct(125, "philco","S90", "Scooter", 500, "./philco.jpg", 20); // violacion de campos mandatorios

console.log(productManager1)
productManager1.getProductById(2) // muestro el producto segun el id si lo encuentra
productManager1.deleteProduct(1).then(console.log("termino el delete")) // elimino un producto


// cambio el objeto con ID 2 dentro del array de productos, 
//pasando como segundo parametro un objeto con clave valor
//cuando finaliza updateProduct, graba el array actualizado
productManager1.updateProduct(2,{description: "New Description"})

productManager1.updateProduct(2,{title: "New Title"})





//setTimeout(()=>console.log(productManager1.addProduct(126, "Meepo","Hurricane", "Electric Skateboard", 500, "./hurricane.jpg", 20)),2000)

 
*/
//productManager1.getProducts().then((element)=> console.log("products",element))
