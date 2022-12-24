
import fs from 'fs'

class cartManager{
    constructor()
    {
        this.carts = []
        this.filename = '../carts.json'

    }

    
    getNextID= () => {
        const count =this.carts.length
        return (count> 0) ? this.carts[count-1].id + 1 : 1
    }

    grabarArchivo = async () =>{
        await fs.promises.writeFile(this.filename, JSON.stringify(this.carts))
        console.log('archivo guardado')
    }
        // constructor por parametros
    
    create = async() =>{
        this.carts = await this.getCarts()
        console.log("this.carts", this.carts)
        const nextID = this.getNextID()
        let newCart = {
            id:nextID,
            products: []
        }
        this.carts.push(newCart)
        await this.grabarArchivo()
            
    
        }   
    
    updateCart =(id, updData)=>{
            let i = 0
                for (const cartToUpdate of this.carts){
                    console.log("recorriendo carritos", cartToUpdate)
                    if(cartToUpdate.id == id){
                        let cartUpdated = {...cartToUpdate,...updData }
                        console.log("producto a actualizar", cartUpdated)
                        //console.log("producto actualizado", productUpdated)
                        this.carts[i] = cartUpdated
                    }
                   i++ 
                }
                console.log("productos actualizados", this.carts)
                this.grabarArchivo() // guarda en el archivo lo que quedo en this.products
    }

    addProduct = async( cartID, productID) =>{
       const myCart = await this.getCartById(cartID)
       console.log("myCart", myCart)
       if(JSON.stringify(myCart)!='{}')
       {
            let found = false
            for(let i = 0; i< myCart.products.length ;i++){
                if(myCart.products[i].id== productID){
                    myCart.products[i].quantity ++
                    found = true
                    break
                }
            }
            if(!found){
                console.log("no lo encontro")
                myCart.products.push({id: productID, quantity: 1})
        //this.carts = {...cart,...this.carts}
            }
            this.updateCart(cartID, myCart)
            console.log("cart", myCart)

            await this.grabarArchivo()
        }
        else console.log("Cart not found")
        return myCart
    }   
    // constructor por objeto Product

   

    getCarts = async() =>{
        return fs.promises.readFile(this.filename, 'utf-8')
        .then (content=> {
            return JSON.parse(content)
            })
        .catch(e=>  {
            console.log("Error",e)
            return []
        })
        
    }

    getCartById = async(id) => {
        let contenido = await (fs.promises.readFile(this.filename, 'utf-8'))
        if(contenido)
        {
            const found =  JSON.parse(contenido).find((el) => el.id == id)
            console.log("productFound", found)
            if (found == undefined){
                console.log (`cart ${id} not found`)
                return({})
            }
            else{
                console.log("cart found",found)
                return(found)
            }
        }
        else{
            return({})
        }     
    }
 
    
    
   
}
export default cartManager

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
