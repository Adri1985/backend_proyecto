import { Router } from 'express'
import querystring from 'querystring'
import {getAll, getOne, updateOne, createOne, deleteOne} from '../controllers/product.controller.js'
import productManager from '../dao/db/productManager.js'

const router = Router()

let productManager1 = new productManager()  


router.get('/', getAll)
   
router.get('/:id',getOne)

router.post('/', createOne)

router.put('/:id',updateOne) 

router.delete('/:id',deleteOne)

export default router