import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import GameMainPage from './GameMainPage';
import UndeadSurvivor from './undead-survivor';

const Game = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GameMainPage />} />
        <Route path="/undead-survivor/*" element={<UndeadSurvivor />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Game;
