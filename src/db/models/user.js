'use strict';
const { Model } = require('sequelize');
const crypto  = require('crypto')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = crypto.createHash('md5').update(value).digest('hex');
        this.setDataValue('password', hash);
      }
    },
    userType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    underscored: false,
    tableName: 'Users',
  });
  return User;
};