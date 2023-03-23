import { Router } from 'express'
import querystring from 'querystring'
import {getAll, getOne, updateOne, createOne, deleteOne} from '../controllers/product.controller.js'


const router = Router()

router.get('/', getAll)
   
router.get('/:id',getOne)

router.post('/', createOne)

router.put('/:id',updateOne) 

router.delete('/:id',deleteOne)

export default router