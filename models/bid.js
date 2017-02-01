module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define("Bid", {
    amount: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.Item);
        Bid.belongsTo(models.User);
      }
    },
    defaultScope: {
      order: 'amount DESC'
    },
    instanceMethods: {
      auction_delete_path: function(auction) {
        return "/auctions/" + auction.id + "/bids/" + this.id + "/delete";
      },
      item_delete_path: function(item, auction = item.Auction) {
        return "/auctions/" + auction.id + "/items/" + item.id + "/bids/" + this.id + "/delete";
      }
    }
  });

  return Bid;
};
