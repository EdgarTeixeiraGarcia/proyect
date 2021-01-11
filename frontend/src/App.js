import './App.css';
import Header from './Header';
import Footer from './Footer'
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import { Switch, Route, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import { useClubsList, useSkillsList, useUsersFilterList } from './api';


function App() {

  const me = useUser()
  
  const clubs = useClubsList()
  const skills = useSkillsList()
  const usersSkills = useUsersFilterList()
  // const filters = new URLSearchParams(window.location.search)

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
                {clubs && clubs.map(club => 
                  <Link to={`/?club=${club.club_name}`} key={club.id}>
                    {club.club_name}
                  </Link>
                )}
              <h4 className="filter_name">HABILIDADES</h4>
                {skills && skills.map(skill => 
                    <span key={skill.id}>
                      {skill.skill}
                    </span>
                )}
              <h4 className="filter_name">EDAD</h4>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
              <h4 className="filter_name">POSICION</h4>
                <span>Portero</span>
                <span>Defensa</span>
                <span>Centrocampista</span>
                <span>Delantero</span>
              </aside>
          </Route>
        </Switch>
      </body>
      <footer className="footer"><Footer /></footer>
    </div>
  );
}

export default App;
