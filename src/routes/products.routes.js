import { Router } from "express";

const router = Router()

let products = []

router.get('/', (req, res) => {
    res.send(products)
})


router.get('/:productId', (req, res) => {
    let productId = parseInt(req.params.productId)

    console.log(productId);

    let searchProduct = products.find(el => el.id === productId)

    if(!searchProduct) {
        res.send('Ese ID no coincide con ningun producto')
    }

    res.send(searchProduct)
})

router.post('/', (req, res) => {
    let product = req.body

    function generateProductId() {
        const lastProduct = products[products.length - 1];
        
        const newId = lastProduct ? lastProduct.id + 1 : 1;
        
        return newId;
    }

    product.id = generateProductId()
    product.status = true

    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
        console.error("El producto no es valido");
        console.error(product);
        res.status(400).send({ status: "Error", message: "Producto invalido, verifique los datos de entrada."});
    } else {
        products.push(product)
        console.log(products);
        res.send({ status: "Success", message: `El producto ${product.title} fue agregado con exito`});
    }
})

router.put('/:productId', (req, res) => {
    let productId = parseInt(req.params.productId)

    let productUptade = req.body

    let searchProduct = products.findIndex(el => el.id === productId)

    if(searchProduct < 0) {
        return res.status(202).send({ status: "info", error: "Producto no encontrado, verifique la id proporcionada" })
    } else {
        products[searchProduct] = productUptade
        products[searchProduct].id = productId
        products[searchProduct].status = true
        res.send({ status: "Success", message: `El producto ${searchProduct.title} fue actualizado con exito`});
        
    }
})

router.delete('/:productId', (req, res) => {
    let productId = parseInt(req.params.productId)

    let searchProduct = products.findIndex(el => el.id === productId)

    if(searchProduct < 0) {
        return res.status(202).send({ status: "info", error: "Ese ID no coincide con la de ningun producto" })
    }

    products.splice(searchProduct, 1)

    res.send({ status: "Sucess", message: "El producto fue eliminado"})

})

export default router 