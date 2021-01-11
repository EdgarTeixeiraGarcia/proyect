import { useState } from 'react';
import { useSetUser } from './UserContext';
import { register } from './api';
import './Register.css';

function Register() {

    const setMe = useSetUser()

    const [name, setName] = useState();
    const [last_name, setLast_name] = useState();
    const [nif, setNif] = useState();
    const [email, setEmail] = useState();
    const [birthdate, setBirthdate] = useState();
    const [password, setPassword] = useState();
    const [repeatedPassword, setRepeatedPassword] = useState();
    const [rol, setRol] = useState();
    const [isError, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = await register(name, last_name, nif, email, birthdate, password, repeatedPassword, rol)
        if (data.token) {
            setMe(data)
        } else {
            setError(true)
        }
    }

    return (
        <div className="register">
            <form className="form-register" onSubmit={handleSubmit}>
                <label>Nombre
                    <input className="input-register" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre"/>
                </label>
                <label>Apellido
                    <input className="input-register" value={last_name} onChange={e => setLast_name(e.target.value)} placeholder="Apellido"/>
                </label>
                <label className="email">Email
                    <input className="input-register" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </label>
                <label>Contraseña
                    <input  type="password" className="input-register" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña"/>
                </label>
                <label>Repite la contraseña
                    <input type="password" className="input-register" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} placeholder="Repite la contraseña"/>
                </label>
                <label>NIF
                    <input className="input-register" value={nif} onChange={e => setNif(e.target.value)} placeholder="NIF"/>
                </label>
                <label>Fecha de Nacimiento:
                    <input type="date" className="input-register" value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="Fecha de Nacimiento"/>
                </label> 
                <label className="tipo_cuenta">Tipo de cuenta
                    <input  type="radio" className="input-rol" value="player" name="rol" onClick={e => setRol(e.target.value)} />
                    <label for="player" className="input-register">Futbolista</label>
                    <input  type="radio" className="input-rol" value="manager" name="rol" onClick={e => setRol(e.target.value)} />
                    <label for="manager" className="input-register">Manager</label>
                </label>
                {isError &&
                    <div className="error"> 
                        Error al registrarse
                    </div>
                }
                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
}

export default Register;