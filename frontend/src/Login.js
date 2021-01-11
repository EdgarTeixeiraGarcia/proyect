import { useState } from 'react';
import { useSetUser } from './UserContext';
import { login } from './api';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {

    const setMe = useSetUser()


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isError, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = await login(email, password)
        if (data.token) {
            setMe(data)
        } else {
            setError(true)
        }
    }

    return (
        <div className="login">
            <form className="form-login" onSubmit={handleSubmit}>
                <label>
                    <input className="input-login" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </label>
                <label>
                    <input className="input-login" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña"/>
                </label>
                {isError &&
                    <div className="error"> 
                        Email o Contraseña incorrecto
                    </div>
                }
                <button className="iniciar_sesion" type="submit">Iniciar sesión
                <Link to="/"></Link>
                </button>
                <div className="separator"></div>
                <Link to="/register" className="nueva_cuenta">Crear cuenta nueva</Link>
            </form>
        </div>
    );
}

export default Login;

