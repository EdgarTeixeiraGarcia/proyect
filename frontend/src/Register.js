import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetUser } from './UserContext';
import { register, useCountriesList } from './api';
import './Register.css';

function Register() {

    const setMe = useSetUser()
    const countries = useCountriesList()
    const history = useHistory()

    const [name, setName] = useState();
    const [last_name, setLast_name] = useState();
    const [nif, setNif] = useState();
    const [email, setEmail] = useState();
    const [birthdate, setBirthdate] = useState();
    const [password, setPassword] = useState();
    const [repeatedPassword, setRepeatedPassword] = useState();
    const [rol, setRol] = useState();
    const [country, setCountry] = useState();
    const [isError, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = await register(name, last_name, nif, email, birthdate, password, repeatedPassword, rol, country)
        if (data.token) {
            setMe(data)
            history.push("/");
        } else {
            setError(data.error || true)
        }
    }

    return (
        <div className="register">
            <form className="form-register" onSubmit={handleSubmit}>
                <label className="label-register">Nombre
                    <input className="input-register" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre"/>
                </label>
                <label className="label-register">Apellido
                    <input className="input-register" value={last_name} onChange={e => setLast_name(e.target.value)} placeholder="Apellido"/>
                </label>
                <label className="label-register">NIF
                    <input className="input-register" value={nif} onChange={e => setNif(e.target.value)} placeholder="NIF"/>
                </label>
                <label className="label-register">Fecha de Nacimiento:
                    <input type="date" className="input-register" value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="Fecha de Nacimiento"/>
                </label>
                <label className="label-register">Email
                    <input className="input-register" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </label>
                <label className="label-register">País
                    {/* <input className="input-register" value={country} onChange={e => setCountry(e.target.value)} placeholder="Country"/> */}
                    <select className="countries-list" name="country" value={country} onChange={e => setCountry(e.target.value)}>
                    {countries && countries.map(country => 
                        <option key={country.id} value={country.id}>
                            {country.country}
                        </option>
                )}
                    </select>
                </label>
                <label className="label-register">Contraseña
                    <input  type="password" className="input-register" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña"/>
                </label>
                <label className="label-register">Repite la contraseña
                    <input type="password" className="input-register" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} placeholder="Repite la contraseña"/>
                </label>
                <label className="acount-type">Tipo de cuenta:
                    <input  type="radio" className="input-rol" value="player" name="rol" onClick={e => setRol(e.target.value)} />
                    <label for="player" className="label-acount-type">Futbolista</label>
                    <input  type="radio" className="input-rol" value="manager" name="rol" onClick={e => setRol(e.target.value)} />
                    <label for="manager" className="label-acount-type">Manager</label>
                </label>
                {isError &&
                    <div className="error"> 
                        Error al registrarse
                    </div>
                }
                <button type="submit" className="register-button">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;