import { useState, useEffect, Fragment, useCallback } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { playerProfile } from './api';
import { act } from 'react-dom/test-utils';


function Profile() {

    const { user: me, token } = useUser();
    const [ playerProfile, setPlayerProfile] = useState([])

    useEffect(() => {
        playerProfile.then((dataPlayer)=> setPlayerProfile(dataPlayer))
    }, [])

    return (
        <div className="player-profile">
            <h2>Mi Perfil</h2>
            <label className="foto_perfil">
               <span>Foto de Perfil</span> 
               {/* <div className="value">
                <div className="foto" style=""></div>
                <input name="foto" type="file" accept="image/"></input>
               </div> */}
            </label>
                <div className="personal_data">Datos Personales
                <label>Nombre:
                    <span></span>
                </label>
                <label>Apellidos:
                    <span></span>
                </label>
                <label>NIF:
                    <span></span>
                </label>
                <label>Email:
                    <span></span>
                </label>
                <label>Fecha de Nacimiento:
                    <span></span>
                </label>
                <label>Edad:
                    <span></span>
                </label>
                <label>Teléfono:
                    <span></span>
                </label>
                <label>País:
                    <span></span>
                </label>
                <button>Actualizar datos personales</button>
                </div>
            {me.rol==='manager' && (
              <button>Enviar solicitud de contratacion</button>
            )}
            
        </div>
    );
}



export default Profile;
