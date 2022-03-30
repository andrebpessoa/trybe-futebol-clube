import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ClubOption from './ClubOption';
import Scoreboard from './Scoreboard';

const EditGame = ({
  homeTeam,
  awayTeam,
  homeTeamGoals,
  awayTeamGoals,
  idMatch,
  updateMatch,
  finishMatch,
  getClub,
}) => {
  const [currentHomeTeamGoals, setHomeTeamGoals] = useState(homeTeamGoals);
  const [currentAwayTeamGoals, setAwayTeamGoals] = useState(awayTeamGoals);
  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <ClubOption
            testId="insertion_matchs__select_home_team"
            teams={ homeTeam }
            homeTeam
            getClub={ getClub }
          />
          <Scoreboard
            testId="insertion_matchs__select_quantity_goals_home_team"
            homeTeam
            score={ currentHomeTeamGoals }
            setScore={ setHomeTeamGoals }
            qtyGoal={ homeTeamGoals }
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matchs__select_quantity_goals_away_team"
            homeTeam={ false }
            score={ currentAwayTeamGoals }
            setScore={ setAwayTeamGoals }
            qtyGoal={ awayTeamGoals }
          />
          <ClubOption
            testId="insertion_matchs__select_away_team"
            teams={ awayTeam }
            homeTeam={ false }
            getClub={ getClub }
          />
        </div>
        <div className="match-settings-form-buttons">
          <button
            data-testid="insertion_matchs__edit_match_btn"
            onClick={ () => updateMatch(idMatch,
              {
                homeTeamGoals: currentHomeTeamGoals,
                awayTeamGoals: currentAwayTeamGoals,
              }) }
            type="button"
          >
            Editar

          </button>
          <button
            data-testid="insertion_matchs__finish_match_btn"
            onClick={ () => finishMatch(idMatch) }
            type="button"
          >
            Finalizar

          </button>
        </div>
      </form>
    </section>
  );
};

EditGame.propTypes = ({
  homeTeam: PropTypes.any,
  awayTeam: PropTypes.any,
  homeTeamGoals: PropTypes.any,
  awayTeamGoals: PropTypes.any,
  idMatch: PropTypes.any,
  getClub: PropTypes.any,
  finishMatc: PropTypes.any,
  updateMatch: PropTypes.any,
}).isRequired;

export default EditGame;
