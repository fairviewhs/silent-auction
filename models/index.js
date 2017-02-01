var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../config');

// Generate connection instance
var sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.user,
  config.sequelize.password,
  config.sequelize.options
);

var db = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
module.exports = db;
