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

    const tag = await Tag.bulkCreate();
    await seedProducts();
    await seedTags();
    await seedProducttags();

    process.exit(0)
}

seedAll();
