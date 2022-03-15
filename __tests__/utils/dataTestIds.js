function dataTestid(dataValue) {
  return `[data-testid=${dataValue}]`;
}
module.exports = {
  header: {
    showMatchsButton: dataTestid('header__show_matchs_btn'),
    loginButton: dataTestid('header__login_btn'),
    title: dataTestid('header__title'),
    showClassificationButton: dataTestid('header__show_classification_btn'),
  },
  leaderboard: {
    loginButton: dataTestid('header__login_btn'),
    matchsButton: dataTestid('header__show_matchs_btn'),
    table: {
      header: {
        classification: dataTestid('score_boarding__classification'),
        clubName: dataTestid('score_boarding__club_name'),
        totalPoints: dataTestid('score_boarding__total_points'),
        totalGames: dataTestid('score_boarding__total_games'),
        totalVictories: dataTestid('score_boarding__total_victories'),
        totalDraws: dataTestid('score_boarding__total_draws'),
        totalLosses: dataTestid('score_boarding__total_looses'),
        goalsFavor: dataTestid('score_boarding__goals_favor'),
        goalsOwn: dataTestid('score_boarding__goals_own'),
        goalsBalance: dataTestid('score_boarding__goals_balance'),
        efficiency: dataTestid('score_boarding__efficiency'),
      },
      body: {
        classification: (sufix) => dataTestid(`score_boarding__classification_${sufix}`),
        clubName: (sufix) => dataTestid(`score_boarding__club_name_${sufix}`),
        totalPoints: (sufix) => dataTestid(`score_boarding__total_points_${sufix}`),
        totalGames: (sufix) => dataTestid(`score_boarding__total_games_${sufix}`),
        totalVictories: (sufix) => dataTestid(`score_boarding__total_victories_${sufix}`),
        totalDraws: (sufix) => dataTestid(`score_boarding__total_draws_${sufix}`),
        totalLosses: (sufix) => dataTestid(`score_boarding__total_looses_${sufix}`),
        goalsFavor: (sufix) => dataTestid(`score_boarding__goals_favor_${sufix}`),
        goalsOwn: (sufix) => dataTestid(`score_boarding__goals_own_${sufix}`),
        goalsBalance: (sufix) => dataTestid(`score_boarding__goals_balance_${sufix}`),
        efficiency: (sufix) => dataTestid(`score_boarding__efficiency_${sufix}`),
      },
      filter: {
        select: dataTestid('score_boarding__classification_filter'),
        button: dataTestid('score_boarding__classification_filter_button')
      }
    },
  },
  pageLogin: {
    inputEmail: `input${dataTestid('login__login_input')}`,
    inputPassword: `input${dataTestid('login__password_input')}`,
    buttonLogin: dataTestid('login__login_btn'),
    alertLogin: dataTestid('login__input_invalid_login_alert'),
  },
  pageMatchs: {
    optionShowFinishMatch: dataTestid('matchs__option_show_finish_matchs'),
    searchMatchsBtn: dataTestid('matchs__search_match_btn'),
    homeTeam: (sufix) => dataTestid(`matchs__home_team_${sufix}`),
    homeTeamGoals: (sufix) => dataTestid(`matchs__home_team_goals_${sufix}`),
    awayTeam: (sufix) => dataTestid(`matchs__away_team_${sufix}`),
    awayTeamGoals: (sufix) => dataTestid(`matchs__away_team_goals_${sufix}`),
    matchStatus: (sufix) => dataTestid(`matchs__match_status_${sufix}`),
    matchStatusBtn: (sufix) => dataTestid(`matchs__match_status_btn_${sufix}`),
    addNewMatchButton: dataTestid('header__add_match_btn'),
  },
  pageMatchSettings: {
    selectHomeTeam: dataTestid('insertion_matchs__select_home_team'),
    selectQuantityGoalsHomeTeam: dataTestid('insertion_matchs__select_quantity_goals_home_team'),
    selectQuantityGoalsAwayTeam: dataTestid('insertion_matchs__select_quantity_goals_away_team'),
    selectAwayTeam: dataTestid('insertion_matchs__select_away_team'),
    saveMatchButton: dataTestid('insertion_matchs__save_match_btn'),
    finishMatchButton: dataTestid('insertion_matchs__finish_match_btn'),
    editMatchButton: dataTestid('insertion_matchs__edit_match_btn'),
  },
};
