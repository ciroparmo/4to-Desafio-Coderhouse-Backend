import express from 'express';
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Port = 8080

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)


app.listen(Port, () => console.log(`Server running on port: ${Port}`))