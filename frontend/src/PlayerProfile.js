import { useState, useEffect, Fragment, useCallback } from 'react';
import { useSetUser, useUser } from './UserContext';
import './Profile.css';
import { useMePersonalData, meVideos, meTecnicalData, updateTecnicalData, useClubsList } from './api';
import { act } from 'react-dom/test-utils';


function Profile() {

 
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
            {me.rol==='manager' && (
              <button>Enviar solicitud de contratacion</button>
            )}
            
        </div>
    );
}



export default Profile;
