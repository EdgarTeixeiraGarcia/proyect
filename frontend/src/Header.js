import { useSetUser, useUser } from './UserContext'
import './Header.css';
import { Link, useHistory} from 'react-router-dom';

function Header() {

    const setMe = useSetUser();
    const me = useUser()

    return (
        <header className="Header">
            <div className="first-row">
                <Link to="/">Logo</Link> 
                <h1 className="titulo">Golden Boy
                    <div>Enséñale al mundo tus habilidades</div>
                </h1>
                {me ?
                    <div className="user">
                        <Link to="/profile" className="login_header">{me.user.name}</Link>
                        <Link to="/" onClick={() => setMe()}>Cerrar Sesión</Link>
                    </div> : <Link to="/login" className="login_header" >Entrar</Link>
                } 
            </div>
        </header>
    )

}

export default Header;