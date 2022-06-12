import { Sequelize, DataTypes } from 'sequelize';

const Client = new Sequelize('sqlite::memory:', {
  logging: false,
});

const User = Client.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  verified: { type: DataTypes.BOOLEAN },
});

const Message = Client.define('Messages', {
  messageId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  message: { type: DataTypes.STRING },
});

export default {
  Client,
  User,
  Message,
};
