import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public club_name: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  timestamps: false,
});

export default Club;
