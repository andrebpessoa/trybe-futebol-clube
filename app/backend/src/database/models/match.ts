import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './club';

class Match extends Model {
  declare id: string;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Match',
  tableName: 'matches',
});

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
