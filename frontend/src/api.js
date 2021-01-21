import useFetch from './useFetch'

export const useUserList = () => useFetch('http://localhost:8080/api/users')
export const useClubsList = () => useFetch('http://localhost:8080/api/clubs')
export const useSkillsList = () => useFetch('http://localhost:8080/api/skills')
export const useCountriesList = () => useFetch('http://localhost:8080/api/countries')
export const useUsersFilterList = (position) => useFetch('http://localhost:8080/api/players/filterByPosition')

export const login = async (email, password) => {
    const ret = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password})
    })
    const data = await ret.json()
    return data
}

export const register = async (name, last_name, nif, email, birthdate, password, repeatedPassword, rol, country) => {
    const ret = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name, last_name, nif, email, birthdate, password, repeatedPassword, rol, country})
    })
    const data = await ret.json()
    return data
}

export const updateTecnicalData = async (token, height, dominant_leg, main_position, secundary_position, property_of, actual_team) => {
    const ret = await fetch('http://localhost:8080/api/player/update', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify({ token, height, dominant_leg, main_position, secundary_position, property_of, actual_team })
    })
    const data = await ret.json()
    return data
}

export const updateAgency = async (token, agency) => {
    const ret = await fetch('http://localhost:8080/api/manager/update', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify({ token, agency })
    })
    const data = await ret.json()
    return data
}

export const insertSkills = async (token, skill) => {
    const ret = await fetch('http://localhost:8080/api/player/insertskill', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify({ token, skill })
    })
}

export const uploadVideo = async (token, content) => {
    const ret = await fetch('http://localhost:8080/api/videos/upload', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify({ token, content })
    })
}

export const deleteUser = async (token) => {
    const ret = await fetch('http://localhost:8080/api/users/delete', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify({ token })
    })
}


export const meTecnicalData = async (token, id)  => {

    const ret = await fetch('http://localhost:8080/api/player/tecnicalData', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}

export const meAgency = async (token, id)  => {

    const ret = await fetch('http://localhost:8080/api/manager/agency', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}

export const playerData = async (token, id)  => {

    const ret = await fetch('http://localhost:8080/api/users/playerProfile', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}

export const mePersonalData = async (token, phone, perfil_photo)  => {

    const fd = new FormData()
    fd.append('phone', phone)
    fd.append('image', perfil_photo)
    

    const ret = await fetch('http://localhost:8080/api/user/update', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token},
        body: fd
    })
    const data = await ret.json()
    return data
}

export const meVideos = async (token) => {
    const ret = await fetch('http://localhost:8080/api/multimedia/meVideos', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}

export const meSkills = async (token) => {
    const ret = await fetch('http://localhost:8080/api/player/meSkills', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}

export const filterByClub = async (club) => {
    const ret = await fetch('http://localhost:8080/api/players/filterByClub?'  + new URLSearchParams({
        club,
    })) 
    const data = await ret.json()
    return data
}

export const filterBySkill = async (skill) => {
    const ret = await fetch('http://localhost:8080/api/players/filterBySkill?'  + new URLSearchParams({
        skill,
    })) 
    const data = await ret.json()
    return data
}

export const filterByPosition = async (position) => {
    const ret = await fetch('http://localhost:8080/api/players/filterByPosition?'  + new URLSearchParams({
        position,
    })) 
    const data = await ret.json()
    return data
}

export const filterByAge = async (age) => {
    const ret = await fetch('http://localhost:8080/api/players/filterByAge?'  + new URLSearchParams({
        age,
    })) 
    const data = await ret.json()
    return data
}

export const playerProfile = async (id) => {
    const ret = await fetch('http://localhost:8080/api/users/playerProfile?'  + new URLSearchParams({
        id,
    })) 
    const data = await ret.json()
    return data
}

export const contract = async (token, id_player) => {
    const ret = await fetch('http://localhost:8080/api/manager/contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ token, id_player})
    })
    const data = await ret.json()
    return data
}

