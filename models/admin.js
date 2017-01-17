module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define("Admin", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
    // reset_token: DataTypes.STRING,
    // reset_sent: DataTypes.DATE,
    // signin_count: DataTypes.INTEGER,
    // current_signin: DataTypes.DATE,
    // last_signin: DataTypes.DATE,
    // confirm_token: DataTypes.STRING,
    // confirm_date: DataTypes.DATE,
    // confirm_sent_date: DataTypes.DATE,
    // current_signin_ip: DataTypes.STRING,
    // last_signin_ip: DataTypes.STRING,
    // confirmed_email: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Admin.hasMany(models.AuctionOwner);
      }
    }
  });

  return Admin;
};
