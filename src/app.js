import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'


const app = express()

app.use(express.json())
app.use('/static', express.static('public'))



app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
//app.use('/api/pets', petsRouter)

app.listen(8080)