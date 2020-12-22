import React, { useContext, useState } from 'react';

const userContext = React.createContext();

const UserProvider = ({ children }) => {
    const [me, setMe] = useState()

    return (
        <userContext.Provider value={{ me, setMe}}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    return useContext(userContext).me
}

export const useSetUser = () => {
    return useContext(userContext).setMe
}

export default UserProvider