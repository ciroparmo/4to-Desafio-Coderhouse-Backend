import { Router } from "express";
import getProducts from './products.routes.js'

const router = Router()

let carts = []

router.post('/', (req, res) => {
    let cart = req.body

    function generateCartId() {
        const lastCart = carts[carts.length - 1];
        
        const newId = lastCart ? lastCart.id + 1 : 1;
        
        return newId;
    }

    cart.id = generateCartId()
    cart.products = []

    carts.push(cart)
    console.log(carts);
    res.send({ status: "Success", message: `El carrito fue creado con exito`});
})

router.get('/:cid', (req, res) => {
    let cartId = parseInt(req.params.cid)

    let searchCart = carts.find(el => el.id === cartId)

    if(!searchCart) {
        res.send('Ese ID no coincide con ningun carrito')
    }

    res.send(searchCart)
})

router.post('/:cid/product/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)

    let searchCart = carts.find(el => el.id === cartId)

    if(!searchCart) {
        res.status(404).send({ status: "Error", message: "No se encontró el carrito" });
    }

    // Obtener los productos usando la función getProducts
    let products = getProducts();
    let productToAdd = products.find(prod => prod.id === productId);

    if (!productToAdd) {
        res.status(404).send({ status: "Error", message: "No se encontró el producto" });
    }

    let productIndex = searchCart.products.findIndex(prod => prod.id === productId);

    if (productIndex !== -1) {
        searchCart.products[productIndex].quantity++;
    } else {
        searchCart.products.push({ id: productId, quantity: 1 });
    }

    res.send({ status: "Success", message: `Producto agregado al carrito ${cartId}` });
})

export default router
