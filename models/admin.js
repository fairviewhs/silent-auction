var nodemailer = require('nodemailer');
var config = require('../config');
var ejs = require('ejs');
var fs = require('fs');
var uuids = require('node-uuid');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: config.secrets.mail
});

module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define("Admin", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    confirm_token: DataTypes.STRING,
    confirmed_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    super_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: function(admin, options) {
        // assigns a random token to the admin when being created
        admin.confirm_token = uuids.v4();
        admin.send_confirmation(()=>{});
      }
    },
    classMethods: {
      associate: function(models) {
        Admin.belongsToMany(models.Auction, { through: 'AuctionOwner' });
      }
    },
    instanceMethods: {
      /**
       * Sends a confirmation email for this admin
       * @param {function()} callback - called when the email has been sent
       */
      send_confirmation(callback){
        transporter.sendMail({
          from: 'SilentAuctions <silentauction@fairviewhs.org>',
          to: this.email,
          subject: 'Silent Auction Account Confirmation',
          html: ejs.render(
            fs.readFileSync(__dirname+'/../views/mail/password/create.ejs', 'ascii'),
            { name: this.name, confirm_url: config.root+'/user/confirm/'+this.confirm_token }
          )
        }, function(error, info){
          if(error){
            return console.log(error);
          }
          callback();
        });
      }
    }
  });

  return Admin;
};
