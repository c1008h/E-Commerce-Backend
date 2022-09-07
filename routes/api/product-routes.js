const router = require('express').Router()
const { Product, Category, Tag, Producttag } = require('../../models')

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [
            {
                model: Tag,
                attributes: ['tag_name']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [
            {
                model: Tag,
                attributes: ['tag_name']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbProductData => {
        if(!dbProductData) {
            res.status(404).json({message: 'product not found'})
            return
        }
        res.json(dbProductData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((product) => {
        return Producttag.findAll({where: { product_id: req.params.id }})
    })
    .then((producttags) => {
        const pti = producttags.map(({ tag_id }) => tag_id)
        const newproducttags = req.body.tag_id
        .filter((tag_id) => !pti.includes(tag_id)
        .map((tag_id) => {
            return {
                product_id: req.params.id,
                tag_id
            }
        }))
        const pttr = producttags
        .filter(({ tag_id }) => !req.body.tag_id.include(tag_id))
        .map(({ id }) => id)

        return Promise.all([
            Producttag.destroy({ where: { id: pttr }}),
            Producttag.bulkCreate(newproducttags)
        ])
    })
    .then((updatedproducttags) => res.json(updatedproducttags))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tag_id: req.body.tag_id
    })
    .then((product) => {
        if(req.body.tag_id.length) {
            const ptia = req.body.tag_id.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id
                }
            })
            return Producttag.bulkCreate(ptia)
        }
        res.status(200).json(product)
    })
    .then((pti) => res.status(200).json(pti))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

module.exports = router;