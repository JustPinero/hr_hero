module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
      superHeroName:{
          type: DataTypes.STRING,
          allowNull:false
      },
        firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      portrait: {
        type: DataTypes.STRING,
      }
    });
    return Employee;
  };