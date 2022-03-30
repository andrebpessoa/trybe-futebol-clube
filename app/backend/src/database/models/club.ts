import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  declare id: string;

  declare clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Club',
  tableName: 'clubs',
});

export default Club;
