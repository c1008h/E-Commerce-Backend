const router = require('express').Router();
const { Tag, Producttag, Product } = require('../../models');

// GET all Tag
router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll();
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// GET a tag 
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
        // JOIN with producttag, using the Trip through table
        include: [{ model: Producttag, through: Product, as: 'product_tag' }]
        });

        if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(tagData => {
        if(!tagData) {
            res.status(404).json({message: 'This id is not associated to any tags'})
            return;
        }
        res.json(tagData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
  
// CREATE a tag
router.post('/', async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});
  
// DELETE a tag
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
        where: {
            id: req.params.id
        }
        });

        if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
  