import useFetch from './useFetch'

export const useUserList = () => useFetch('http://localhost:8080/api/users')
export const useClubsList = () => useFetch('http://localhost:8080/api/clubs')
export const useSkillsList = () => useFetch('http://localhost:8080/api/skills')
export const useCountriesList = () => useFetch('http://localhost:8080/api/countries')
export const useUsersFilterList = (position) => useFetch('http://localhost:8080/api/players/filterByPosition')
// export const useUsersFilterByClub = () => useFetch('http://localhost:8080/api/players/filterByClub')
// export const useUserById = (id) => useFetch('http://localhost:8080/users/' + id)


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
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, last_name, nif, email, birthdate, password, repeatedPassword, rol, country})
    })
    const data = await ret.json()
    return data
}

export const useMeData = async (token, phone, perfil_photo)  => {

    const fd = new FormData()
    fd.append('phone', phone)
    fd.append('perfil_photo', perfil_photo)

    const ret = await fetch('http://localhost:8080/api/user/update', {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token},
        body: fd
    })
    const data = await ret.json()
    return data
}

// export const clubsList = async () => {

//     const ret = await fetch('http://localhost:8080/api/clubs', {
//         method: 'GET'
//     })
//     const data = await ret.json()
//     return data
// }

export const meVideos = async (token) => {
    const ret = await fetch('http://localhost:8080/api/multimedia/meVideos', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token},
    })
    const data = await ret.json()
    return data
}