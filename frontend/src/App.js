import './App.css';
import Header from './Header';
import Acordeon from './Acordeon';
import Footer from './Footer'
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import PlayerProfile from './PlayerProfile'
import { useState, useMemo, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import { useClubsList, useSkillsList, useUsersFilterList, filterByClub, filterBySkill, filterByPosition, filterByAge, playerProfile } from './api';


function App() {

  const me = useUser()

  const ages = [14,15,16,17,18,19,20,21,22,23,24,25]
  const positions = ['Portero', 'Defensa', 'Centrocampista', 'Delantero']
  
  const clubs = useClubsList()
  const skills = useSkillsList()
  const usersSkills = useUsersFilterList()
  const location = useLocation()
  const filters = useMemo(() => new URLSearchParams(location.search), [location])

  const [data , setData ] = useState([])

  useEffect(() => {
    if (filters.has('club')) {

      // console.log(filters.get('club'))
      filterByClub(filters.get('club')).then((datos) => setData(datos))
    }
    if (filters.has('skill')) {
      console.log(filters.get('skill'))
      filterBySkill(filters.get('skill')).then((datos) => setData(datos))
    } 
    if (filters.has('age')) {
      console.log(filters.get('age'))
      filterByAge(filters.get('age')).then((datos) => setData(datos))
    } 
    if (filters.has('position')) {
      console.log(filters.get('position'))
      filterByPosition(filters.get('position')).then((datos) => setData(datos))
    }
    // if (filters.has('id')) {
    //   console.log(filters.get('id'))
    //   playerProfile(filters.get('id')).then((datos) => setData(datos))
    // }

    
  }, [filters])

  // console.log(filters.get('club'))

  return (
    <div className="App">
      <header className="header"><Header /></header>
      <body className="body">
          {/* <aside className="filter">
            <h3>Filtros</h3>
            <h4 className="filter_name">CLUB</h4>
          </aside> */}
        {/* {me ? <Profile /> : <Login/>} */}
        <Switch>
        <Route path="/playerProfile">
            <PlayerProfile />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <aside className="filter">
              <h3>Filtros</h3>
              <h4 className="filter_name">CLUB</h4>
              <Acordeon>
                {clubs && clubs.map(club => 
                  <Link to={`/?club=${club.club_name}`} key={club.id}>
                    <span>{club.club_name}</span>
                  </Link>
                )}
                </Acordeon>
              <h4 className="filter_name">HABILIDADES</h4>
                <Acordeon>
                  {skills && skills.map(skill => 
                      <Link to={`/?skill=${skill.skill}`} key={skill.id}>
                        <span>{skill.skill}</span>
                      </Link>
                  )}
                </Acordeon>
              <h4 className="filter_name">EDAD</h4>
              <Acordeon>
              {ages && ages.map(age => 
                    <Link to={`/?age=${age}`} key={age}>
                      <span>{age}</span>
                    </Link>
                )}
              </Acordeon>
              <h4 className="filter_name">POSICION</h4>
              <Acordeon>
              {positions && positions.map(position => 
                    <Link to={`/?position=${position}`} key={position}>
                      <span>{position}</span>
                    </Link>
                )}
              </Acordeon>
              </aside>
              <div className="welcome">
                {data?.length > 0 ? 
                  (data.map(player => (<Link to={`/playerProfile?id=${player.id}`} key={player.id}>
                    <div>
                      <span>{player.name}</span>
                      <span>{player.age}</span>
                      <span>{player.country}</span>
                    </div></Link>))):(<span>Bienvenidos</span>)
                }
              </div>
          </Route>
        </Switch>
      </body>
      <footer className="footer"><Footer /></footer>
    </div>
  );
}

export default App;
