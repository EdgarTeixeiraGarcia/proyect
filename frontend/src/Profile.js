import { useState } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { useMeData, meVideos } from './api';


function Profile() {

    const { user: me, token } = useUser();
    console.log(me);
    const setMe = useSetUser()

    const [name, setName] = useState(me.name || "")


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
            <div className="ficha_tecnica">Ficha Técnica
               <label>Altura:
                   <span></span>
               </label>
               <label>Pierna dominante:
                   <span></span>
               </label>
               <label>Posición principal:
                   <span></span>
               </label>
               <label>Posición secundaria:
                   <span></span>
               </label>
               <label>Propiedad de:
                   <span></span>
               </label>
               <label>Equipo actual:
                   <span></span>
               </label>
            </div>
            <div className="videos">Vídeos
            <button>Subir video</button>
            </div>
        </div>
    );
}

export default Profile;
