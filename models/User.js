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
        levelPermission: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: "user",
        hooks: {
          beforeCreate: async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 4);
            user.password = hashedPassword;
          },
        },
      },
    );

    return User;
  }
}

module.exports = User;
