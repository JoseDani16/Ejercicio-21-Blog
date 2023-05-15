const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: { msg: "El mail no tiene un formato válido" } },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user",
        hooks: {
          beforeCreate: async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 4);
            user.password = hashedPassword; 
            
            if (!user.roleId){
              user.roleId = 1;
            }
          },
          beforeUpdate: async (user, options) => {
            try {
              const hashedPassword = await bcrypt.hash(user.password, 4);
              user.password = hashedPassword;
            } catch (error) {
              console.error('Error hashing password:', error);
            }
        }
      },
    }
    );

    return User;
  }
}

module.exports = User;
