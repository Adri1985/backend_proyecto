class Product {
    constructor(id, marca, modelo, tipo, rango, precio, topFeature1, topFeature2, topFeature3, imageName, liked, stock, onCart){
            this.id = id
            this.marca = marca
            this.modelo = modelo
            this.tipo = tipo
            this.rango = rango
            this.precio = precio
            this.topFeature1 = topFeature1
            this.topFeature2 = topFeature2
            this.topFeature3 = topFeature3
            this.imageName= imageName
            this.liked = liked
            this.onCart = onCart
            console.log("producto creado")
    }    
    
}
export default Product