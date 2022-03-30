import React from 'react';
import PropTypes from 'prop-types';

const ClubOption = ({ teams, homeTeam, getClub, testId }) => (
  <label htmlFor={ (homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard' }>
    { (homeTeam) ? <p>Time Mandante</p> : <p>Time Visitante</p> }
    <select
      data-testid={ testId }
      onChange={ ({ target: { value } }) => {
        const homeOrAway = (homeTeam) ? 'homeClub' : 'awayClub';
        getClub(value, homeOrAway);
      } }
    >
      {
        teams.map(({ clubName }, index) => (
          <option key={ index } value={ clubName }>{ clubName }</option>
        ))
      }
    </select>
  </label>
);

ClubOption.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  homeTeam: PropTypes.bool.isRequired,
  getClub: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ClubOption;
