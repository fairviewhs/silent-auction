module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User);
        Item.hasMany(models.Bid);
      }
    }
  });

  return Item;
};
