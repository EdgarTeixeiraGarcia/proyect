import { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { Link, useHistory } from 'react-router-dom';
import { mePersonalData, meVideos, meTecnicalData, meAgency, updateTecnicalData, updateAgency, useClubsList, insertSkills, useSkillsList, meSkills, uploadVideo, deleteUser } from './api';

import { act } from 'react-dom/test-utils';


function Profile() {

    const { user: me, token } = useUser();
    const theInput = useRef();
    console.log(me);
    const setMe = useSetUser()
    const history = useHistory()

    const clubs = useClubsList()
    const skills = useSkillsList()
    const mainPositions = ['Portero','Lateral derecho','Defensa central','Lateral izquierdo',
    'Centrocampista defensivo','Medio izquierdo','Medio derecho','Centrocampista ofensivo',
    'Extremo izquierdo','Extremo derecho','Segundo delantero','Delantero centro']

    const [videos, setVideos ] = useState([])
    const [playerSkills, setPlayerSkills] = useState([])
    const [data, setData ] = useState({})
    const [preview, setPreview ] = useState(me.perfil_photo)

    const [ phone, setPhone ] = useState(me.phone || "")

    const [ birthdate, setBirthdate ] = useState(() => {
        const fecha = new Date(me.birthdate)
        if (fecha) {
            return `${fecha.getUTCDate()}/${fecha.getUTCMonth()+1}/${fecha.getUTCFullYear()}`;
        }
        return me.birthdate;
    })



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

    const deleteMe = useCallback(() => {
        deleteUser(token);
        setMe();
        history.push('/');

    }, [deleteUser, token, setMe, history]);


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
            <Link to="/" className="inicio">Inicio</Link>
            <span className="myProfile">Mi Perfil</span>
            <form onSubmit={handleSubmit} className="form-profile">
                <div className="profile-data">
                    <div className="value">
                        <div className="photo" style={style} value={preview} onClick={handleClick}></div>
                        <input className="hide" name="image" type="file" accept="image/*" onChange={handlePicture} ref={theInput}></input>
                    </div>
                    <div className="profile-data-container">
                        <div className="personal-data">
                            <span className="personal-data-title">DATOS PERSONALES:</span>
                            <div className="personal-data-container">
                                <label className="label-personal-data">Nombre:
                                    <span className="span-player-personal-data">{me.name}</span>
                                </label>
                                <label className="label-personal-data">Apellidos:
                                    <span className="span-player-personal-data">{me.last_name}</span>
                                </label>
                                <label className="label-personal-data">NIF:
                                    <span className="span-player-personal-data">{me.nif}</span>
                                </label>
                                <label className="label-personal-data">Fecha de Nacimiento:
                                    <span className="span-player-personal-data">{birthdate}</span>
                                </label>
                                <label className="label-personal-data">Edad:
                                    <span className="span-player-personal-data">{me.age}</span>
                                </label>
                                <label className="label-personal-data">País:
                                    <span className="span-player-personal-data">{me.country}</span>
                                </label>
                            </div>
                        </div>
                        <div className="contact-data">
                            <span className="personal-data-title">DATOS CONTACTO:</span>
                            <div className="contact-data-container">
                                <label className="label-personal-data">Email:
                                    <span className="span-player-personal-data">{me.email}</span>
                                </label>
                                <label className="label-personal-data">Teléfono:
                                    <input value={phone} onChange={e => setPhone(e.target.value)}></input>
                                </label>
                            </div>
                        </div>
                        <button className="personal-data-button">ACTUALIZAR FICHA</button>
                    </div>
                </div>
            </form>
            {me.rol==='player' ? (
            <Fragment>
                <div className="tecnical-data">
                    <div className="ficha-tecnica">
                        <span className="personal-data-title">FICHA TÉCNICA</span>
                        <form className="form-tecnical-data" onSubmit={handleTecnicalData}>
                            <span className="span-personal-data">Altura:</span>
                            <div>
                                <input value={height} onChange={e => setHeight(e.target.value)} className="input-tecnical-data"></input>
                                <span className="text-personal-data"> cm</span>
                            </div>
                            <span className="span-personal-data">Pierna dominante:</span>
                            <input value={dominantLeg} onChange={e => setDominantLeg(e.target.value)} className="input-tecnical-data"></input>
                            <span className="span-personal-data">Posición principal:</span> 
                                {/* <input value={mainPosition} onChange={e => setMainPosition(e.target.value)}></input> */}
                                <select className="countries-list" name="main-position" value={mainPosition} onChange={e => setMainPosition(e.target.value)}>
                                {mainPositions && mainPositions.map(position => 
                                    <option key={position.id} value={position}>
                                        {position}
                                    </option>
                                )}
                                </select>
                                
                            <span className="span-personal-data">Posición secundaria:</span>
                                {/* <input value={secundaryPosition} onChange={e => setSecundaryPosition(e.target.value)}></input> */}
                                <select className="countries-list" name="secundary-position" value={secundaryPosition} onChange={e => setSecundaryPosition(e.target.value)}>
                                {mainPositions && mainPositions.map(position => 
                                    <option key={position.id} value={position}>
                                        {position}
                                    </option>
                                )}
                                </select>
                            <span className="span-personal-data">Propiedad de:</span>
                                <select className="countries-list" name="club" value={propertyOf} onChange={e => setPropertyOf(e.target.value)}>
                                {clubs && clubs.map(club => 
                                    <option key={club.id} value={club.id}>
                                        {club.club_name}
                                    </option>
                                )}
                                </select>  
                            <span className="span-personal-data">Equipo actual:</span>
                                <select className="countries-list" name="club" value={actualTeam} onChange={e => setActualTeam(e.target.value)}>
                                {clubs && clubs.map(club => 
                                    <option key={club.id} value={club.id}>
                                        {club.club_name}
                                    </option>
                                )}
                                </select>
                            <button className="tecnical-data-button" type="submit">ACTUALIZAR DATOS TÉCNICOS</button>
                        </form>
                
                    </div>
                    <div className="skills">
                        <span className="personal-data-title">HABILIDADES</span>
                        {playerSkills && playerSkills.map((playerSkill)=> 
                                <span className="text-personal-data" key={playerSkill.id}>{playerSkill.skill}</span>   
                        )}
                        <form onSubmit={handleSkills} className="form-tecnical-data">
                            <span className="insert-skill">NUEVA HABILIDAD:</span>
                                <select className="countries-list" name="skill" value={skill} onChange={e => setSkill(e.target.value)}>
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
                            <button className="insert-skill-button" type="submit">INSERTAR HABILIDAD</button>
                        </form>
                    </div>
                </div>
                <div className="videos">
                    <span className="videos-tittle">VÍDEOS</span>
                    <div className="video">
                        {videos && videos.map((video)=> 
                                <div className="videos-url" key={video.id}>
                                <iframe width="560" height="315" src={video.content.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </div>
                        )}
                    </div>
                    <form onSubmit={handleVideos}>
                        <label className="upload-video">Link de Youtube:
                            <input  className="input-video" value={content} onChange={e => setContent(e.target.value)}></input>
                        </label>
                        <button className="upload-video-button" type="submit">PUBLICAR VÍDEO</button>
                    </form>
                </div>
            </Fragment>
           
            ): (
                <Fragment>
                    <div className="agency">
                        <span className="personal-data-title">AGENCIA:</span>
                        <form onSubmit={handleAgency} className="form-tecnical-data">
                            <label>Nombre:
                                <input value={agency} onChange={e => setAgency(e.target.value)}></input>
                            </label>  
                            <button className="insert-skill-button" type="submit">ACTUALIZAR</button>
                        </form>
                    </div>
                    {/* <div className="agency">Agencia
                        <form onSubmit={handleAgency}>
                            <label>Nombre:
                                <input value={agency} onChange={e => setAgency(e.target.value)}></input>
                            </label>
                            <button className="agency-button" type="submit">Actualizar</button>
                        </form>
                    </div>  */}
                </Fragment>
            )}
            <div className="delete">
                <button className="delete-acount-button" onClick={deleteMe}>ELIMINAR CUENTA</button>
            </div> 
            <div className="welcome-image"></div>
        </div>
    );
}


export default Profile;
