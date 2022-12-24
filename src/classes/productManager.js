import Product from './Product.js'

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
    
    getNextID= () => {
        const count =this.products.length
        return (count> 0) ? this.products[count-1].id + 1 : 1
    }

    grabarArchivo = async () =>{
        await fs.promises.writeFile(this.filename, JSON.stringify(this.products))
        
        console.log('archivo guardado')
    
    }
    
        // constructor por parametros
    addProduct = async( code,title, description, price, thumbnail, stock) =>{
        if (this.products.find((el)=> el.code == code)!= undefined)
        {
            console.log("codigo duplicado")
        } 
        else{

            console.log(`codeito ${code} title ${title} description ${description} price ${price} thumbnail ${thumbnail} stock ${stock}`)
            if(code&&title&&description&&price&&thumbnail&&stock){
                this.products.push(new Product(this.getNextID(),code,title, description, price, thumbnail, stock))
                console.log("productos", this.products)
                await this.grabarArchivo()
                console.log("Producto agregado a la lista")
            }
            else{
                console.log("all fields are mandatory, product not added")
            }
        }  

    }   
    // constructor por objeto Product

  
    deleteProduct= async(id) =>{
        let contenido = await (fs.promises.readFile(this.filename, 'utf-8'))
        if(contenido)
        {
            let filteredProducts=  JSON.parse(contenido).filter ((el) => el.id != id)
            console.log("tamanio filtered",filteredProducts.length)
            console.log("productos", this.products.length)
            if(filteredProducts.length < this.products.length) // borro el producto, grabar el archivo
            {
                this.setProducts(filteredProducts)
                this.grabarArchivo()
            }
            else{
                console.log("ID No encontrado, no se pudo borrar el producto")
            }
        }
    }   

    getProducts = async() =>{
        return fs.promises.readFile(this.filename, 'utf-8')
        .then (content=> {
            return JSON.parse(content)
            })
        .catch(e=>  {
            console.log("Error",e)
            return []
        })
        
    }

    getProductById = async(id) => {
        let contenido = await (fs.promises.readFile(this.filename, 'utf-8'))
        if(contenido)
        {
            const productFound =  JSON.parse(contenido).find((el) => el.id == id)
            console.log("productFound", productFound)
            if (productFound == undefined){
                console.log (`product ${id} not found`)
                return({})
            }
            else{
                console.log("product found",productFound)
                return(productFound)
            }
        }
        else{
            return({})
        }     
    }
    updateProduct =(id, updData)=>{
        let i = 0
            for (const productToUpdate of this.products){
                if(productToUpdate.id == id){
                    let productUpdated = {...productToUpdate,...updData }
                    console.log("producto a actualizar", productUpdated)
                    //console.log("producto actualizado", productUpdated)
                    this.products[i] = productUpdated
                }
               i++ 
            }
            console.log("productos actualizados", this.products)
            this.grabarArchivo() // guarda en el archivo lo que quedo en this.products
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
