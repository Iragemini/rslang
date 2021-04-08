import React from 'react';
import {Link} from 'react-router-dom';

const Games = () => {
  return (
    <>
      <div>GAMES</div>
      <Link to="games/sprint">Sprint</Link>
      <div><Link to="games/savanna">Savanna</Link></div>
      <div><Link to="games/voice">Voice</Link></div>
    </>
  );
};

export default Games;
