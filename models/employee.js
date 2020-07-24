module.exports = function(sequelize, DataTypes) {
    const Employee = sequelize.define("Employee", {
        title:{
            type: DataTypes.STRING,
            allowNull:false
      },
        firstName: {
            type: DataTypes.STRING
      },
        lastName: {
            type: DataTypes.STRING
      },
        email: {
            type:DataTypes.STRING,
            validate:{
                isEmail:true
            }
        },
        portrait: {
            type: DataTypes.STRING,
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('skills').split(',')
            },
            set(val) {
                console.log(val)
                
            this.setDataValue('skills', val.join(','));
            },
        }
    });
    return Employee;
  };