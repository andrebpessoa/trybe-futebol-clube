import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './club';

class Match extends Model {
  declare id: string;

  declare home_team: number;

  declare home_team_goals: number;

  declare away_team: number;

  declare away_team_goals: number;

  declare in_progress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
