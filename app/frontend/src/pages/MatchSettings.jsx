import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateNewGame from '../components/CreateNewGame';
import EditGame from '../components/EditGame';
import Header from '../components/Header';
import MatchsBtn from '../components/MatchsBtn';
import Loading from '../components/Loading';
import api, { requestData, setToken } from '../services/requests';
import '../styles/pages/matchSettings.css';

const MatchSettings = () => {
  const [clubs, setClubs] = useState([]);
  const [homeTeamScoreboard, setHomeTeamScoreboard] = useState('0');
  const [awayTeamScoreboard, setAwayTeamScoreboard] = useState('0');
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const storage = JSON.parse(localStorage.getItem('user'));

      if (!storage) return navigate('/');

      const { token } = storage;

      setToken(token);
      api.get('/login/validate')
        .then(() => setIsAuthenticated(true))
        .catch(() => navigate('/'));
    })();
  }, [navigate]);

  useEffect(() => {
    const endpoint = '/clubs';

    const { token } = JSON.parse(localStorage.getItem('user')) || { token: '' };
    if (token !== '') {
      setToken(token);
    }
    if (!clubs.length) {
      requestData(endpoint)
        .then((response) => {
          setClubs(response);
        })
        .catch((error) => console.log(error));
    }
  });

  const getClub = (club, homeOrAway) => {
    const { id } = clubs.find(({ clubName }) => clubName === club);
    if (homeOrAway === 'homeClub') { setHomeClub(id); } else { setAwayClub(id); }
  };

  const createMatch = async (inProgress) => {
    const body = {
      homeTeam: +homeClub,
      awayTeam: +awayClub,
      homeTeamGoals: +homeTeamScoreboard,
      awayTeamGoals: +awayTeamScoreboard,
      inProgress,
    };

    const { data } = await api.post('/matchs', body);
    return data;
  };

  const updateMatch = async (id, updateGoals) => {
    await api.patch(`/matchs/${id}`, { ...updateGoals });
  };
  const finishMatch = async (id) => {
    await api.patch(`/matchs/${id}/finish`);
  };

  if (!isAuthenticated) return <Loading />;

  if (location.state) {
    const { id,
      homeClub: homeClubState,
      homeTeamGoals,
      awayClub: awayClubState,
      awayTeamGoals,
    } = location.state;
    return (
      <>
        <Header
          page="EDITAR PARTIDA"
          FirstNavigationLink={ MatchsBtn }
          logged={ isAuthenticated }
          setLogin={ setIsAuthenticated }
        />
        <EditGame
          homeTeam={ [homeClubState] }
          awayTeam={ [awayClubState] }
          homeTeamGoals={ homeTeamGoals }
          awayTeamGoals={ awayTeamGoals }
          idMatch={ id }
          updateMatch={ updateMatch }
          finishMatch={ finishMatch }
          getClub={ getClub }
        />
      </>
    );
  }

  return (
    <>
      <Header
        page="ADICIONAR PARTIDA"
        FirstNavigationLink={ MatchsBtn }
        logged={ isAuthenticated }
        setLogin={ setIsAuthenticated }
      />
      <CreateNewGame
        setHomeTeamScoreboard={ setHomeTeamScoreboard }
        setAwayTeamScoreboard={ setAwayTeamScoreboard }
        clubs={ clubs }
        getClub={ getClub }
        createMatch={ createMatch }
        finishMatch={ finishMatch }
      />
    </>
  );
};

export default MatchSettings;
