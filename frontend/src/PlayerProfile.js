import { useState, useEffect, Fragment, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { playerProfile } from './api';
import { act } from 'react-dom/test-utils';


function Profile() {

    const location = useLocation()

    const filters = useMemo(() => new URLSearchParams(location.search), [location])

    const { user: me, token } = useUser();
    const [data , setData ] = useState([])
    
    
    // const dataProfile = playerProfile()
    // console.log(dataProfile)

    useEffect(() => {
        if (filters.has('id') && filters.get('id')) {
          console.log(filters.get('id'))
          playerProfile(filters.get('id')).then((datos) => setData(datos))
        }    
      }, [filters])

    return (
        <div className="player-profile">
            <body>
            <label className="foto_perfil">
               <span>Foto de Perfil</span> 
               {/* <div className="value">
                <div className="foto" style=""></div>
                <input name="foto" type="file" accept="image/"></input>
               </div> */}
            </label>
                <div className="personal_data">Datos Personales
                <label>Nombre:
                    <span>{data.name}</span>
                </label>
                <label>Apellidos:
                    <span>{data.last_name}</span>
                </label>
                <label>NIF:
                    <span>{data.nif}</span>
                </label>
                <label>Email:
                    <span>{data.email}</span>
                </label>
                <label>Fecha de Nacimiento:
                    <span>{data.birthdate}</span>
                </label>
                <label>Edad:
                    <span>{data.age}</span>
                </label>
                <label>Teléfono:
                    <span>{data.phone}</span>
                </label>
                <label>País:
                    <span>{data.country}</span>
                </label>
                </div>
                <div className="personal_data">Ficha Técnica
                <label>Altura:
                    <span>{data.height}</span>
                </label>
                <label>Pierna Dominante:
                    <span>{data.dominant_leg}</span>
                </label>
                <label>Posición Principal:
                    <span>{data.main_position}</span>
                </label>
                <label>Posición Secundaria:
                    <span>{data.secundary_position}</span>
                </label>
                <label>Equipo Actual:
                    <span>{data.nameActualTeam}</span>
                </label>
                <label>Propiedad de:
                    <span>{data.namePropertyOf}</span>
                </label>
                </div>
                <div>Habilidades
                    {data.skill && data.skill.map((playerSkill)=> 
                        <div key={playerSkill.id}>
                            <span>{playerSkill}</span>
                        </div>
                    )}
                </div>
                <div className="videos">Vídeos
                    <div>
                        {data.content && data.content.map((video)=> 
                                <span key={video.id}>
                                <iframe width="560" height="315" src={video.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </span>
                        )}
                    </div>
                </div>
            {me.rol==='manager' && (
              <button>Enviar solicitud de contratacion</button>
            )}
            </body> 
          
            
        </div>
    );
}



export default Profile;
