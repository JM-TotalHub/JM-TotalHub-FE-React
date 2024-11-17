import React from 'react';
import { Link } from 'react-router-dom';

const GameMainPage = () => {
  return (
    <div>
      <h1>준모의 게임 모음</h1>

      <h2>WebGame</h2>
      <p>웹상으로 플레이 할 수 있는 게임들 입니다.</p>
      <Link to={`/game/undead-survivor`}>Undead Survivor</Link>

      <h2>Game</h2>
      <p>준비중 입니다.</p>
    </div>
  );
};

export default GameMainPage;
