// const seedCategories = require('./category-seeds')
// const seedProducts = require('./product-seeds')
// const seedProducttags = require('./product-tag-seeds')
// const seedTags = require('./tag-seeds')

const sequelize = require('../config/connection')
const { Tag, Product, Producttag, Category } = require('../models')

const categorySeedData = require('./category-seeds.json');
const productSeedData = require('./product-seeds.json');
const tagSeedData = require('./tag-seeds.json');
const producttagSeedData = require('./product-tag-seeds.json');

const seedAll = async () => {
    await sequelize.sync({ force: true })

    await Category.bulkCreate(categorySeedData);
    await Product.bulkCreate(productSeedData);
    await Tag.bulkCreate(tagSeedData);
    await Producttag.bulkCreate(producttagSeedData);


    process.exit(0)
}

seedAll();
