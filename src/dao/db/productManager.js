import Product from './Product.js'

import productModel from '../models/product.model.js'



import fs from 'fs'

class productManager{
    constructor()
    {
        this.products = []
        this.filename = '../products.json'

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

    addProductDB = async( product) =>{   // DEJO LAS VALIDACIONES QUE EXISTIAN
        const {code,title, description, price, thumbnail, stock} = product
        if (this.products.find((el)=> el.code == code)!= undefined)
        {
            console.log("codigo duplicado")
        } 
        else{

            console.log(`codeito ${code} title ${title} description ${description} price ${price} thumbnail ${thumbnail} stock ${stock}`)
            if(code&&title&&description&&price&&thumbnail&&stock){
                //this.products.push(new Product(this.getNextID(),code,title, description, price, thumbnail, stock))
                //console.log("productos", this.products)
                const result = await productModel.create(product)
                return({status:'success', payload:result})
                console.log("Producto agregado a la lista")
            }
            else{
                console.log("all fields are mandatory, product not added")
            }
        }  

    }   

  
    deleteProduct= async(id) =>{
        const result = await productModel.deleteOne({_id: id})
        return (result)
    }   

    /*getProducts = async() =>{
        return fs.promises.readFile(this.filename, 'utf-8')
        .then (content=> {
            return JSON.parse(content)
            })
        .catch(e=>  {
            console.log("Error",e)
            return []
        })
        
    }*/

    getProductsDB = async(search, options) =>{
        const productsPaginated = await productModel.paginate(search, options )
        console.log("products en db", productsPaginated)
    
        return productsPaginated
        
    }


    getProductById = async(id) => {
        let productFound = await productModel.findOne({_id: id}).lean().exec()
      
            if (productFound == undefined){
                console.log (`product ${id} not found`)
                return({})
            }
            else{
                console.log("product found",productFound)
                return(productFound)
            }
     
    }
    updateProduct = async(id, updProduct)=>{
       
        let result = await productModel.updateOne({_id: id}, updProduct)
        return (result)
    
}

}
export default productManager

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
