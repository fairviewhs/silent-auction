module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    amount: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        Donation.belongsTo(models.Auction);
        Donation.belongsTo(models.User);
      }
    }
  });

  return Donation;
};
