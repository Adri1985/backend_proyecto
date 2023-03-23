import CartDTO from '../DAO/DTO/carts.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

 
    getOne = async(id)=>{
        return await this.dao.getOne(id)
    }

    updateOne = async(id, updProduct)=>{
        return await this.dao.updateOne(id, updProduct)
    }


    createOne = async(data) => {
        const dataToInsert = new CartDTO(data)

        return await this.dao.createOne(dataToInsert)
    }
    deleteOne = async(id)=>{
        return await this.dao.deleteOne(id)
    }

    addProductToCart = async(cartID, productID, qty)=>{
        return await this.dao.addProductToCart(cartID, productID, qty)
    }
}