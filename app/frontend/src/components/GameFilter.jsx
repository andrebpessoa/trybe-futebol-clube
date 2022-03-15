import React from 'react';
import PropTypes from 'prop-types';

const GamerFilter = ({ currentFilter, setCurrentFilter }) => {
  const handleCurrentFilter = () => {
    const selectedFilter = document.getElementById('game-filter').value;
    setCurrentFilter(selectedFilter);
  };

  return (
    <form>
      <label htmlFor="game-filter">
        Partidas:
        <select
          id="game-filter"
          defaultValue={ currentFilter }
          data-testid="matchs__option_show_finish_matchs"
        >
          <option>Todos os Jogos</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>
      </label>
      <button
        data-testid="matchs__search_match_btn"
        type="button"
        onClick={ () => handleCurrentFilter() }
      >
        Buscar
      </button>
    </form>
  );
};

GamerFilter.propTypes = ({
  currentFilter: PropTypes.string,
  setCurrentFilter: PropTypes.func,
}).isRequired;

export default GamerFilter;
