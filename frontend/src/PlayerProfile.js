import { useState, useEffect, Fragment, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetUser, useUser } from './UserContext';
import './PlayerProfile.css';
import { playerProfile, contract } from './api';
import { Link } from 'react-router-dom';


function PlayerProfile() {

    const location = useLocation()

    const filters = useMemo(() => new URLSearchParams(location.search), [location]);

    // const { user: me, token } = useUser();
    const [data , setData ] = useState([])

    const [ birthdate, setBirthdate ] = useState(null);
    
    
    const dataProfile = playerProfile()
    console.log(dataProfile)

    useEffect(() => {
        if (filters.has('id') && filters.get('id')) {
          console.log(filters.get('id'))
          playerProfile(filters.get('id')).then((datos) => setData(datos))
        }    
      }, [filters])

      useEffect(() => {
        const fecha = new Date(data.birthdate)
        if (fecha) {
            setBirthdate(`${fecha.getUTCDate()}/${fecha.getUTCMonth()+1}/${fecha.getUTCFullYear()}`);
        } else {
            setBirthdate(data.birthdate)
        }
    },[data])

    // const contractMe = useCallback(() => {
    //     contract(token);
    // }, [ token, data, contract]);


    return (
        <div className="player-profile">
            <Link to="/" className="inicio">Inicio</Link>
            <div className="personal-profile-player">
                
                <div className="photo" style={{ backgroundImage: 'url(' + data.perfil_photo + ')' }}></div>
                <div className="profile-data-container">
                        <div className="personal-data">
                            <span className="personal-data-title">DATOS PERSONALES:</span>
                            <div className="personal-data-container">
                                <div>
                                    <span className="span-personal-data">Nombre:</span>
                                    <span className="text-personal-data">{data.name}</span>
                                </div>
                                <div>
                                    <span className="span-personal-data">Apellidos:</span>
                                    <span className="text-personal-data">{data.last_name}</span>
                                </div>
                                <div>
                                    <span className="span-personal-data">NIF:</span>
                                    <span className="text-personal-data">{data.nif}</span>
                                </div>
                                <div>
                                    <span className="span-personal-data">Fecha de Nacimiento:</span>
                                    <span className="text-personal-data">{birthdate}</span>
                                </div>  
                                <div>
                                    <span className="span-personal-data">Edad:</span>
                                    <span className="text-personal-data">{data.age}</span>
                                </div>
                                <div>
                                    <span className="span-personal-data">País:</span>
                                    <span className="text-personal-data">{data.country}</span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-data">
                            <span className="personal-data-title">DATOS CONTACTO:</span>
                            <div className="contact-data-container">
                                <div>
                                    <span className="span-personal-data">Email:</span>
                                    <span className="text-personal-data">{data.email}</span>
                                </div>
                                <div>
                                    <span className="span-personal-data">Teléfono:</span>
                                    <span className="text-personal-data">{data.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tecnical-data">
                    <div className="ficha-tecnica">
                            <span className="personal-data-title">FICHA TÉCNICA</span>
                            <span className="span-personal-data">Altura:</span>
                            <span className="text-personal-data">{`${data.height} cm`}</span>
                            <span className="span-personal-data">Pierna dominante:</span>
                            <span className="text-personal-data">{data.dominant_leg}</span>
                            <span className="span-personal-data">Posición principal:</span> 
                            <span className="text-personal-data">{data.main_position}</span>    
                            <span className="span-personal-data">Posición secundaria:</span>
                            <span className="text-personal-data">{data.secundary_position}</span>  
                            <span className="span-personal-data">Propiedad de:</span>
                            <span className="text-personal-data">{data.namePropertyOf}</span> 
                            <span className="span-personal-data">Equipo actual:</span>
                            <span className="text-personal-data">{data.nameActualTeam}</span> 
                    </div>
                    <div className="skills">
                        <span className="personal-data-title">HABILIDADES</span>
                        {data.skill && data.skill.map((playerSkill, i)=> 
                                <span className="text-personal-data" key={i}>{playerSkill}</span>   
                        )}
                    </div>
                </div>
                <div className="videos">
                    <span className="videos-tittle">VÍDEOS</span>
                    <div className="video">
                        {data.content && data.content.map((video, i)=> 
                                <div className="videos-url" key={i}>
                                <iframe width="560" height="315" src={video.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </div>
                        )}
                    </div>
                </div>
            {/* {me.rol==='manager' && (
                <button className="contract-button" onClick={() => contractMe(token, data.id_user)}>ENVIAR SOLICITUD DE CONTRATACIÓN</button>
            )}  */}
        </div>
    )
}



export default PlayerProfile;
