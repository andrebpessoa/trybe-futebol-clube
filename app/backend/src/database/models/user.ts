import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: string;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;