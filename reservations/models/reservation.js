console.log(5+7);
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    date: DataTypes.DATE
  });
  return Reservation;
};
