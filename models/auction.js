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
      delete_path: function() {
        return this.id + "/delete";
      },
      edit_path: function() {
        return this.id + "/edit";
      },
      bidders_path: function() {
        return "bid_lnk";
      },
      new_item_path: function() {
        return "new_item_lnk";
      },
      human_start_time: function() {
        return "stime_lnk";
      },
      human_end_time: function() {
        return "etime_lnk";
      },
      isAdmin: function(user) {
        return true;
      }
    }
  });

  return Auction;
};
