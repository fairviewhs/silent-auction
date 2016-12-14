module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define("Auction", {

  }, {
    classMethods: {
      associate: function(models) {
        Auction.hasMany(models.AuctionOwner);
        Auction.hasMany(models.Item);
        Auction.hasMany(models.Donation);
      }
    }
  });

  return Auction;
};
