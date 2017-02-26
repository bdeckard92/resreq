module.exports = function(sequelize, DataTypes) {
  var ResReq = sequelize.define("ResReq", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    hour: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return ResReq;
};