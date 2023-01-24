import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import routerViews from './routes/views.router.js'
import chatManager from './dao/db/chatManager.js'

import {Server} from 'socket.io'

const app = express()

app.use(express.json())
app.use('/static', express.static('public'))

// Config engine templates
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))
app.use('/', routerViews)



app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
//app.use('/api/pets', petsRouter)

const uri = "mongodb+srv://ecommerce_main:ehq@ecommerce.iv6wj6x.mongodb.net/test"

const messages =[]
mongoose.set('strictQuery', false)
mongoose.connect(uri, error => {
    if (error) {
        console.log('No se pudo conectar a la DB:  ', error);
        return
    }
    console.log('DB connected!');

    // Corriendo el servidor
    const server = app.listen(8080, () => console.log('Server listening...'))
    const io = new Server(server)
    io.on('connection', socket => {
        console.log('New client connected');
    
        socket.on('message', data => {
            messages.push(data)
            console.log("data", data)
            new chatManager().addMsg(data)
            io.emit('logs', messages)
        })
    })

})