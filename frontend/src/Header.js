import { useSetUser, useUser } from './UserContext'
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {

    const setMe = useSetUser();
    const me = useUser()

    return (
        <header className="Header">
            <div className="logo"><span className="logo-name">GOLDEN BOY</span></div>
            {/* <div className="first-row"> */}
                {me ?
                    <div className="user"> 
                        <Link to="/profile" className="name-login">{me.user.name}</Link>
                        <Link to="/" className="login-header" onClick={() => setMe()}><span className="text-login">LOGOUT</span></Link>
                    </div> : <div className="user"><Link to="/login" className="login-header"><span className="text-login">LOGIN</span></Link></div>
                } 
            {/* </div> */}
        </header>
    )

}

export default Header;