module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    amount: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        Donation.belongsTo(models.Auction);
        Donation.belongsTo(models.User);
      }
    },
    instanceMethods: {
      delete_path: function(auction) {
        return "/auctions/" + auction.id + "/donations/" + this.id + "/delete";
      }
    }
  });

  return Donation;
};
