import { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { mePersonalData, meVideos, meTecnicalData, meAgency, updateTecnicalData, updateAgency, useClubsList, insertSkills, useSkillsList, meSkills, uploadVideo, deleteUser } from './api';

import { act } from 'react-dom/test-utils';


function Profile() {

    const { user: me, token } = useUser();
    const theInput = useRef();
    console.log(me);
    const setMe = useSetUser()

    const clubs = useClubsList()
    const skills = useSkillsList()
    const mainPositions = ['portero','lateral_derecho','defensa_central','lateral_izquierdo',
    'centrocampista_defensivo','medio_izquierdo','medio_derecho','centrocampista_ofensivo',
    'extremo_izquierdo','extremo_derecho','segundo_delantero','delantero_centro']

    const [videos, setVideos ] = useState([])
    const [playerSkills, setPlayerSkills] = useState([])
    const [data, setData ] = useState({})
    const [preview, setPreview ] = useState(me.perfil_photo)

    const [ phone, setPhone ] = useState(me.phone || "")

    const [ height, setHeight ] = useState(data.height || "")
    const [ dominantLeg, setDominantLeg ] = useState(data.dominant_leg || "")
    const [ mainPosition, setMainPosition ] = useState(data.main_position || "")
    const [ secundaryPosition, setSecundaryPosition ] = useState(data.secundary_position || "")
    const [ propertyOf, setPropertyOf ] = useState(data.property_of || "")
    const [ actualTeam, setActualTeam ] = useState(data.actual_team || "")
    const [ skill, setSkill] = useState(data.skill);
    const [ content, setContent] = useState(data.content);

    const [ agency, setAgency ] = useState(data.agency || "")

    const handleTecnicalData = useCallback((e) => {
        e.preventDefault()
        
        updateTecnicalData(token, height, dominantLeg, mainPosition, secundaryPosition, propertyOf, actualTeam)
    },[height,dominantLeg,mainPosition,secundaryPosition,propertyOf,actualTeam])

    const handleAgency = useCallback((e) => {
        e.preventDefault()
        
        updateAgency(token, agency)
    },[agency])

    const handleClick = e => {
        theInput.current.click()
    }
    
    const handlePicture = e => {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(e.target.files[0])
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        const image = e.target.image.files[0];
        const data = await mePersonalData(token, phone, image )
        if (data) {
            return setMe({token, user:data})
        }
    }
    
    const handleSkills = useCallback((e) => {
        e.preventDefault()

        insertSkills(token, skill)
        meSkills(token).then((skills) => setPlayerSkills(skills))
    },[skill])


    const handleVideos = useCallback((e) => {
        e.preventDefault()

        uploadVideo(token, content)
        meVideos(token).then((multimedia) => setVideos(multimedia))
    },[content])


    useEffect(() => {
          meVideos(token).then((multimedia) => setVideos(multimedia))

          meSkills(token).then((skills) => setPlayerSkills(skills))

          if(me.rol === 'player'){
            meTecnicalData(token, me.id).then((tecnicalData) => setData(tecnicalData))
            
          }
          if(me.rol === 'manager'){
            meAgency(token, me.id).then((agencyData) => setData(agencyData))
            
          }
          
      }, [])

    useEffect(() => {
        setHeight(data.height)
        setDominantLeg(data.dominant_leg)
        setMainPosition(data.main_position)
        setSecundaryPosition(data.secundary_position)
        setPropertyOf(data.property_of)
        setActualTeam(data.actual_team)
        setAgency(data.agency)
    }, [data])


    const style = preview && {backgroundImage: 'url(' + preview + ')'}
    


    return (
        
        <div className="profile">
            <h2>Mi Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className="personal_data">
                    <div className="value">
                        <div className="photo" style={style} value={preview} onClick={handleClick}></div>
                        <input className="hide" name="image" type="file" accept="image/*" onChange={handlePicture} ref={theInput}></input>
                    </div>
                    <div className="personal-data">Datos Personales
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
                            <input value={phone} onChange={e => setPhone(e.target.value)}></input>
                        </label>
                        <label>País:
                            <span>{me.country}</span>
                        </label>
                        <button className="personal-data-button">Actualizar datos personales</button>
                    </div>
                </div>
            </form>
            {me.rol==='player' ? (
            <Fragment>
                <div className="tecnical-data">
                    <div className="ficha_tecnica">Ficha Técnica
                        <form className="form-tecnical-data" onSubmit={handleTecnicalData}>
                            <label>Altura:
                                <input value={height} onChange={e => setHeight(e.target.value)}></input>
                                <span>cm</span>
                            </label>
                            <label>Pierna dominante:
                                <input value={dominantLeg} onChange={e => setDominantLeg(e.target.value)}></input>
                            </label>
                            <label>Posición principal:
                                {/* <input value={mainPosition} onChange={e => setMainPosition(e.target.value)}></input> */}
                                <select className="countries-list" name="main-position" value={mainPosition} onChange={e => setMainPosition(e.target.value)}>
                                {mainPositions && mainPositions.map(position => 
                                    <option key={position.id} value={position}>
                                        {position}
                                    </option>
                                )}
                                </select>
                            </label>     
                            <label>Posición secundaria:
                                {/* <input value={secundaryPosition} onChange={e => setSecundaryPosition(e.target.value)}></input> */}
                                <select className="countries-list" name="secundary-position" value={secundaryPosition} onChange={e => setSecundaryPosition(e.target.value)}>
                                {mainPositions && mainPositions.map(position => 
                                    <option key={position.id} value={position}>
                                        {position}
                                    </option>
                                )}
                                </select>
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
                            <button className="tecnical-data-button" type="submit">Actual datos Tecnicos</button>
                        </form>
                
                    </div>
                    <div className="skills">Habilidades
                        {playerSkills && playerSkills.map((playerSkill)=> 
                            <div key={playerSkill.id}>
                                <span>{playerSkill.skill}</span>
                            </div>
                        )}
                        <form onSubmit={handleSkills}>
                            <label className="insert-skill">Añadir Skill
                                <select className="insert-skill" name="skill" value={skill} onChange={e => setSkill(e.target.value)}>
                                    {skills && skills.map(skill =>{
                                        if(playerSkills.filter((playerSkill)=> playerSkill.id === skill.id).length === 0){
                                            return (
                                                <option key={skill.id} value={skill.skill}>
                                                    {skill.skill}
                                                </option>
                                            )
                                        } 
                                    })}       
                                </select>            
                            </label>
                            <button className="insert-skill-button" type="submit">Insertar Skill</button>
                        </form>
                    </div>
                </div>
                <div className="videos">
                    <span className="videos-tittle">Vídeos</span>
                    <div className="video">
                        {videos && videos.map((video)=> 
                                <span key={video.id}>
                                <iframe width="560" height="315" src={video.content.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </span>
                        )}
                    </div>
                    <form onSubmit={handleVideos}>
                        <label className="upload-video">Link de Youtube:
                            <input value={content} onChange={e => setContent(e.target.value)}></input>
                        </label>
                        <button className="upload-video-button" type="submit">Publicar Video</button>
                </form>
                </div>
            </Fragment>
           
            ): (
                <Fragment>
                    <div className="agency">Agencia
                        <form onSubmit={handleAgency}>
                            <label>Nombre:
                                <input value={agency} onChange={e => setAgency(e.target.value)}></input>
                            </label>
                            <button className="agency-button" type="submit">Actualizar</button>
                        </form>
                    </div> 
                </Fragment>
            )}
            <div className="delete">
                <button className="delete-acount-button">Eliminar Cuenta</button>
            </div> 
        </div>
    );
}



export default Profile;
