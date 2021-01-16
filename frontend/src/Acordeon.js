import { useState } from 'react';

function Acordeon({ children }) {
  const [show, setShow] = useState(false)

  return (
    <div className="acordeon">
      <button onClick={() => setShow(!show)}>
        {show ? 'Mostrar menos' : 'Mostrar más'}
      </button>
      {show &&
        <div className="acordeon-results">
          {children}
        </div>
      }
    </div>
  );
}

export default Acordeon;

{/* <h4 className="filter_name">CLUB</h4>
              <Acordeon>
                {clubs && clubs.map(club => 
                  <Link to={`/?club=${club.club_name}`} key={club.id}>
                    <span className="filter-results">{club.club_name}</span>
                  </Link>
                )}
                </Acordeon> */}
