module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    picture_file_name: DataTypes.STRING,
    picture2_file_name: DataTypes.STRING,
    picture3_file_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User);
        Item.belongsTo(models.Auction);
        Item.hasMany(models.Bid);
      }
    }
  });

  return Item;
};
