module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define("Bid", {
    amount: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.Item);
        Bid.belongsTo(models.User);
      }
    }
  });

  return Bid;
};
