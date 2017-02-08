module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    picture_file_path: DataTypes.STRING,
    picture2_file_path: DataTypes.STRING,
    picture3_file_path: DataTypes.STRING,
    picture_file_name: DataTypes.STRING,
    picture2_file_name: DataTypes.STRING,
    picture3_file_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User);
        Item.belongsTo(models.Auction);
        Item.hasMany(models.Bid);
      }
    },
    instanceMethods: {
      get_path: function(auction = this.Auction) {
        return "/auctions/" + auction.id + "/items/" + this.id;
      },
      delete_path: function(auction = this.Auction) {
        return "/auctions/" + auction.id + "/items/" + this.id + "/delete";
      },
      edit_path: function(auction = this.Auction) {
        return "/auctions/" + auction.id + "/items/" + this.id + "/edit";
      },
      bidders_path: function(auction = this.Auction) {
        return "/auctions/" + auction.id + "/items/" + this.id + "/bids";
      },
      picture_paths: function() {
        return [
          (this.picture_file_path?"/images/uploads/"+this.picture_file_path:undefined),
          (this.picture2_file_path?"/images/uploads/"+this.picture2_file_path:undefined),
          (this.picture3_file_path?"/images/uploads/"+this.picture3_file_path:undefined),
        ];
      },
      thumb: function() {
        if(this.picture_file_path !== null){
          return "/images/uploads/"+this.picture_file_path;
        }else if(this.picture2_file_path !== null){
          return "/images/uploads/"+this.picture2_file_path;
        }else if(this.picture3_file_path !== null){
          return "/images/uploads/"+this.picture3_file_path;
        }else{
          return undefined;
        }
      }
    }
  });

  return Item;
};
