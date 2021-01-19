import { useClubsList, useSkillsList, useUsersFilterList, filterByClub, filterBySkill, filterByPosition, filterByAge } from './api';
import { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import './Filter.css';

function Filter() {

  const me = useUser()

  const ages = [14,15,16,17,18,19,20,21,22,23,24,25]
  const positions = ['Portero', 'Defensa', 'Centrocampista', 'Delantero']
  
  const clubs = useClubsList()
  const skills = useSkillsList()
  const usersSkills = useUsersFilterList()
  const location = useLocation()
  const filters = useMemo(() => new URLSearchParams(location.search), [location])

  const [data , setData ] = useState([])
  const [showClubs, setShowClubs] = useState(false)
  const [showSkills, setShowSkills] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [showPosition, setShowPosition] = useState(false)

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
  }, [filters])

    return (
        <div className="filter">
            <aside className="filter-aside">
              <h3>Filtros</h3>
              <h4 className="filter_name" onClick={() => setShowClubs(!showClubs)}>CLUB
              {showClubs ? 'Ocultar' : 'Mostrar'}</h4>
              {showClubs &&
              <div className="filter-data">
                 {clubs && clubs.map(club => 
                  <Link to={`/?club=${club.club_name}`} key={club.id}>
                    <span className="filter-results">{club.club_name}</span>
                  </Link>
                )}
              </div>
              }  
              <h4 className="filter_name" onClick={() => setShowSkills(!showSkills)}>HABILIDADES
              {showSkills ? 'Ocultar' : 'Mostrar'}</h4>
              {showSkills && 
              <div className="filter-data">
                {skills && skills.map(skill => 
                      <Link to={`/?skill=${skill.skill}`} key={skill.id}>
                        <span>{skill.skill}</span>
                      </Link>
                  )}
              </div>
              } 
              <h4 className="filter_name" onClick={() => setShowAge(!showAge)}>EDAD
              {showAge ? 'Ocultar' : 'Mostrar'}</h4>
              {showAge &&
              <div className="filter-data">
                {ages && ages.map(age => 
                    <Link to={`/?age=${age}`} key={age}>
                      <span>{age}</span>
                    </Link>
                )}
              </div>
              }
              <h4 className="filter_name" onClick={() => setShowPosition(!showPosition)}>POSICION
              {showPosition ? 'Ocultar' : 'Mostrar'}</h4>
              {showPosition &&
              <div className="filter-data">
                {positions && positions.map(position => 
                    <Link to={`/?position=${position}`} key={position}>
                      <span>{position}</span>
                    </Link>
                )}
              </div>
              }
              </aside>
              <div className="welcome">
                {data?.length > 0 ? 
                  (data.map(player => (<Link to={`/playerProfile?id=${player.id}`} key={player.id}>
                    <div className="filter-player">
                      <div className="photo-filter" style={{ backgroundImage: 'url(' + player.perfil_photo + ')' }}></div>
                      <div className="filter-data">
                        <span>{player.name}</span>
                        <span>{player.age}</span>
                        <span>{player.country}</span>
                      </div>
                    </div></Link>))):(<span className="welcome-body">Bienvenidos, únete a nosotros y conviértete en la próxima estrella mundial</span>)
                }
              </div>
        </div>
    )

}

export default Filter;