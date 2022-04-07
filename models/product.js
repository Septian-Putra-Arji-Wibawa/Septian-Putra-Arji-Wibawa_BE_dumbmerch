'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });

      product.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "categoryproduct",
          as: "bridge",
        },
        foreignKey: "idproduct",
      });
    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.BIGINT,
    image: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};