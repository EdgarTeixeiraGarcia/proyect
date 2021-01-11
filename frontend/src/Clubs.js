import { useClubsList } from './api';
import './Clubs.css';

function Clubs(){

    const clubs = await useClubsList

    return (
        {clubs.map(club) => {
            
        }}        
    )
}

export default Clubs;