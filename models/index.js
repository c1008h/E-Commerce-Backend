const Category = require('./Category')
const Product = require('./Product')
const Producttag = require('./Producttag')
const Tag = require('./Tag')

Product.belongsTo(Category, {
    foreignKey: 'category_id',
})

Category.hasMany(Product, {
    foreignKey: 'category_id',
})

Product.belongsToMany(Tag, {
    through: Producttag,
    foreignKey: 'product_id'
})

Tag.belongsToMany(Product, {
    through: Producttag,
    foreignKey: 'tag_id'
})

module.exports = { Category, Product, Producttag, Tag }