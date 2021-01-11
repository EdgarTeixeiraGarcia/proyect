import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const session = JSON.parse(localStorage.getItem('session')) || undefined

    const [me, setMe] = useState(session);

    const setMePlus = v => {
        localStorage.setItem('session', v ? JSON.stringify(v) : 'null')
        setMe(v)
    }
    return (
        <UserContext.Provider value={{ me, setMe: setMePlus }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    console.log('Recibiendo Usuario')
    return useContext(UserContext).me
}

export const useSetUser = () => {
    console.log('Modificando Usuario')
    return useContext(UserContext).setMe
}

export default UserProvider