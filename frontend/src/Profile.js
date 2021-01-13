import { useState, useEffect, Fragment, useCallback } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { useMePersonalData, meVideos, meTecnicalData, updateTecnicalData, useClubsList, insertSkills, useSkillsList, meSkills } from './api';
import { act } from 'react-dom/test-utils';


function Profile() {

    const { user: me, token } = useUser();
    console.log(me);
    const setMe = useSetUser()

    const clubs = useClubsList()
    const skills = useSkillsList()

    const [videos, setVideos ] = useState([])
    const [playerSkills, setPlayerSkills] = useState([])
    const [data, setData ] = useState({})

    // const [ tecnicalData, setTecnicalData ] = useState({})

    // const [name, setName] = useState(me.name || "")
    const [ phone, setPhone ] = useState(me.phone || "")

    const [ height, setHeight ] = useState(data.height || "")
    const [ dominantLeg, setDominantLeg ] = useState(data.dominant_leg || "")
    const [ mainPosition, setMainPosition ] = useState(data.main_position || "")
    const [ secundaryPosition, setSecundaryPosition ] = useState(data.secundary_position || "")
    const [ propertyOf, setPropertyOf ] = useState(data.property_of || "")
    const [ actualTeam, setActualTeam ] = useState(data.actual_team || "")
    const [ skill, setSkill] = useState(data.skill);

    const handleTecnicalData = useCallback((e) => {
        e.preventDefault()
        
        updateTecnicalData(token, height, dominantLeg, mainPosition, secundaryPosition, propertyOf, actualTeam)
    },[height,dominantLeg,mainPosition,secundaryPosition,propertyOf,actualTeam])


    const handleSkills = useCallback((e) => {
        e.preventDefault()

        insertSkills(token, skill)
    },[skill])

    useEffect(() => {
          meVideos(token).then((multimedia) => setVideos(multimedia))

          meSkills(token).then((skills) => setPlayerSkills(skills))

          if(me.rol === 'player'){
            meTecnicalData(token, me.id).then((tecnicalData) => setData(tecnicalData))
            
          }
          
      }, [])

    useEffect(() => {
        setHeight(data.height)
        setDominantLeg(data.dominant_leg)
        setMainPosition(data.main_position)
        setSecundaryPosition(data.secundary_position)
        setPropertyOf(data.property_of)
        setActualTeam(data.actual_team)
    }, [data])

    


    return (
        <div className="profile">
            <h2>Mi Perfil</h2>
            <label className="foto_perfil">
               <span>Foto de Perfil</span> 
               {/* <div className="value">
                <div className="foto" style=""></div>
                <input name="foto" type="file" accept="image/"></input>
               </div> */}
            </label>
            <form>
                <div className="personal_data">Datos Personales
                <label>Nombre:
                    <span>{me.name}</span>
                </label>
                <label>Apellidos:
                    <span>{me.last_name}</span>
                </label>
                <label>NIF:
                    <span>{me.nif}</span>
                </label>
                <label>Email:
                    <span>{me.email}</span>
                </label>
                <label>Fecha de Nacimiento:
                    <span>{me.birthdate}</span>
                </label>
                <label>Edad:
                    <span>{me.age}</span>
                </label>
                <label>Teléfono:
                    <span>{me.phone}</span>
                </label>
                <label>País:
                    <span>{me.country}</span>
                </label>
                <button>Actualizar datos personales</button>
                </div>
            </form>
            {me.rol==='player' ? (
            <Fragment>
                <div className="ficha_tecnica">Ficha Técnica
                    <form onSubmit={handleTecnicalData}>
                        <label>Altura:
                            <input value={height} onChange={e => setHeight(e.target.value)}></input>
                            <span>cm</span>
                        </label>
                        <label>Pierna dominante:
                            <input value={dominantLeg} onChange={e => setDominantLeg(e.target.value)}></input>
                        </label>
                        <label>Posición principal:
                            <input value={mainPosition} onChange={e => setMainPosition(e.target.value)}></input>
                        </label>     
                        <label>Posición secundaria:
                            <input value={secundaryPosition} onChange={e => setSecundaryPosition(e.target.value)}></input>
                        </label>
                        <label>Propiedad de:
                            <select className="countries-list" name="club" value={propertyOf} onChange={e => setPropertyOf(e.target.value)}>
                            {clubs && clubs.map(club => 
                                <option key={club.id} value={club.id}>
                                    {club.club_name}
                                </option>
                            )}
                            </select>
                        </label>
                        <label>Equipo actual:
                            <select className="countries-list" name="club" value={actualTeam} onChange={e => setActualTeam(e.target.value)}>
                            {clubs && clubs.map(club => 
                                <option key={club.id} value={club.id}>
                                    {club.club_name}
                                </option>
                            )}
                            </select>
                        </label>
                        <button type="submit">Actual datos Tecnicos</button>
                    </form>
               
                </div>
                <div>Habilidades
                    {playerSkills && playerSkills.map((playerSkill)=> 
                        <div key={playerSkill.id}>
                            <span>{playerSkill.skill}</span>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSkills}>
                    <label>Insertar Skill
                        <select className="insert_skill" name="skill" value={skill} onChange={e => setSkill(e.target.value)}>
                            {skills && skills.map(skill =>
                                <option key={skill.id} value={skill.skill}>
                                    {skill.skill}
                                </option>
                            )}       
                        </select>            
                    </label>
                    <button type="submit">Insertar Skill</button>
                </form>
                <div className="videos">Vídeos
                    <div>
                        {videos && videos.map((video)=> 
                                <span key={video.id}>
                                <iframe width="560" height="315" src={video.content.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </span>
                        )}
                    </div>
                <button>Subir video</button>
                </div>
            </Fragment>
           
            ): (
                <Fragment>
                    <div className="agency">Agencia
                        <label>Nombre:
                            <span></span>
                        </label>
                    </div> 
                </Fragment>
            )}
            
        </div>
    );
}



export default Profile;
