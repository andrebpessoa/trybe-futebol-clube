module.exports = {
  select: {
    all: {
      users: 'SELECT * FROM users;',
      matchs: 'SELECT * FROM matchs;',
      clubs: 'SELECT * FROM clubs;',
    },
    where: {
      matchs: (where) => `SELECT * FROM matchs WHERE ${where};`,
    },
  },
  insert: {
    leaderboard: (homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress) => (
      `INSERT INTO TRYBE_FUTEBOL_CLUBE.matchs (home_team, home_team_goals, away_team, away_team_goals, in_progress) VALUES (${homeTeam}, ${homeTeamGoals}, ${awayTeam}, ${awayTeamGoals}, ${inProgress});`
    ),
  },
};
