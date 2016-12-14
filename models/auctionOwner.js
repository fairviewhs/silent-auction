module.exports = function(sequelize, DataTypes) { // admins_auctions
  var AuctionOwner = sequelize.define("AuctionOwner", {
  }, {
    classMethods: {
      associate: function(models) {
        AuctionOwner.belongsTo(models.Admin);
        AuctionOwner.belongsTo(models.Auction);
      }
    }
  });

  return AuctionOwner;
};
