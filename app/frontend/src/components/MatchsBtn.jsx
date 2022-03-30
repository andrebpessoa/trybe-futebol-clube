import React from 'react';
import { Link } from 'react-router-dom';

const MatchsBtn = () => (
  <Link data-testid="header__show_matchs_btn" to="/matchs">
    Partidas
  </Link>
);

export default MatchsBtn;
