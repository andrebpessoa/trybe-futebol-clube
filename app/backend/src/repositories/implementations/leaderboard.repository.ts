import sortArray from 'sort-array';
import Club from '../../database/models/club';
import Match from '../../database/models/match';
import {
  IClubLeaderboard,
  ILeaderboard,
  ILeaderboardRepository,
  IMatchScore,
} from '../ILeaderboardRepository';

export default class LeaderboardRepository implements ILeaderboardRepository {
  private match = Match;

  private club = Club;

  private static totalPoints(matches: IMatchScore[]) {
    return matches.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsAgainst) {
        return totalPoints + 3;
      }

      if (match.goalsFavor === match.goalsAgainst) {
        return totalPoints + 1;
      }

      return totalPoints;
    }, 0);
  }

  private static totalVictories(matches: IMatchScore[]) {
    return matches.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsAgainst) {
        return totalVictories + 1;
      }

      return totalVictories;
    }, 0);
  }

  private static totalDraws(matches: IMatchScore[]) {
    return matches.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsAgainst) {
        return totalDraws + 1;
      }

      return totalDraws;
    }, 0);
  }

  private static totalLosses(matches: IMatchScore[]) {
    return matches.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsAgainst) {
        return totalLosses + 1;
      }

      return totalLosses;
    }, 0);
  }

  private static totalFavorGoals(matches: IMatchScore[]) {
    return matches.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static totalAgainstGoals(matches: IMatchScore[]) {
    return matches.reduce((goalsAgainst, match) => goalsAgainst + match.goalsAgainst, 0);
  }

  private static sortLeaderboard(stats: ILeaderboard[]) {
    const sortRules = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];

    return sortArray(stats, { by: sortRules, order: sortOrder });
  }

  private static createLeaderboard(clubsHistory: IClubLeaderboard[]) {
    const leaderboard = clubsHistory.map(({ clubName, matches }) => {
      const clubStats = {
        name: clubName,
        totalPoints: this.totalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.totalVictories(matches),
        totalDraws: this.totalDraws(matches),
        totalLosses: this.totalLosses(matches),
        goalsFavor: this.totalFavorGoals(matches),
        goalsOwn: this.totalAgainstGoals(matches),
        goalsBalance: 0,
        efficiency: 0,
      };

      clubStats.goalsBalance = clubStats.goalsFavor - clubStats.goalsOwn;
      clubStats.efficiency = +(((clubStats.totalPoints / (matches.length * 3)) * 100).toFixed(2));

      return clubStats;
    });

    return this.sortLeaderboard(leaderboard);
  }

  async findAllHomeMatches() {
    const result = (await this.club.findAll({
      include: [{
        model: Match,
        as: 'homeMatches',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsAgainst']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const rawHistory = clubHistory.get({ plain: true });
        rawHistory.matches = [...rawHistory.homeMatches];
        delete rawHistory.homeMatches;

        return rawHistory;
      });

    return result;
  }

  async findAllAwayMatches() {
    const result = (await this.club.findAll({
      include: [{
        model: Match,
        as: 'awayMatches',
        attributes: [['home_team_goals', 'goalsAgainst'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const rawHistory = clubHistory.get({ plain: true });
        rawHistory.matches = [...rawHistory.awayMatches];

        return rawHistory;
      });

    return result;
  }

  async findAllMatches() {
    return (await this.club.findAll({
      include: [{
        model: Match,
        as: 'homeMatches',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsAgainst']],
        where: { inProgress: false },
      }, {
        model: Match,
        as: 'awayMatches',
        attributes: [['home_team_goals', 'goalsAgainst'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.homeMatches, ...plainHistory.awayMatches];
        return plainHistory;
      });
  }

  async findHomeLeaderboard(): Promise<ILeaderboard[]> {
    const allHomeMatches = await this.findAllHomeMatches();

    const homeLeaderboard = LeaderboardRepository.createLeaderboard(allHomeMatches);

    return homeLeaderboard;
  }

  async findAwayLeaderboard(): Promise<ILeaderboard[]> {
    const clubsAwayHistory = await this.findAllAwayMatches();

    const awayLeaderboard = LeaderboardRepository.createLeaderboard(clubsAwayHistory);

    return awayLeaderboard;
  }

  async findLeaderboard(): Promise<ILeaderboard[]> {
    const clubsHistory = await this.findAllMatches();

    const leaderboard = LeaderboardRepository.createLeaderboard(clubsHistory);

    return leaderboard;
  }
}
