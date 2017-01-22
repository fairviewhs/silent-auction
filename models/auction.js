module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define("Auction", {
    name: DataTypes.STRING,
    host: DataTypes.STRING,
    description: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Auction.belongsToMany(models.Admin, { through: 'AuctionOwner' });
        Auction.hasMany(models.Item);
        Auction.hasMany(models.Donation);
      }
    },
    instanceMethods: {
      get_path: function() {
        return "/auctions/" + this.id;
      },
      delete_path: function() {
        return "/auctions/" + this.id + "/delete";
      },
      edit_path: function() {
        return "/auctions/" + this.id + "/edit";
      },
      bidders_path: function() {
        return "/auctions/" + this.id + "/bids";
      },
      new_item_path: function() {
        return "/auctions/" + this.id + "/items/new";
      },
      isAdmin: function(user) {
        return true;
      }
    }
  });

  return Auction;
};
