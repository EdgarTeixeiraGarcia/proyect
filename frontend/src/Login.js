import { useState } from 'react';
import { useSetuser } from './UserContext';

function Login() {

    const setMe = useSetuser()

    const [user, setUser] = useState();
}