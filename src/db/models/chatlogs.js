'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatLogs extends Model {
    static associate(models) {
      // define association here
    }
  }
  ChatLogs.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatLogs',
  });
  return ChatLogs;
};