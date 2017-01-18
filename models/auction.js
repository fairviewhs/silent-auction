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
        return "";
      },
      edit_path: function() {
        return "";
      },
      bidders_path: function() {
        return "";
      },
      new_item_path: function() {
        return "";
      },
      human_start_time: function() {
        return "";
      },
      human_end_time: function() {
        return "";
      }
    }
  });

  return Auction;
};
