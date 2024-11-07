import React from 'react';
import { Link } from 'react-router-dom';

const OverviewPage = () => {
  return (
    <>
      <h1>개요 메인페이지</h1>

      <Link to={`/overviews/info`}>사이트 소개</Link>
      <Link to={`/overviews/portfolio`}>포트폴리오</Link>
    </>
  );
};

export default OverviewPage;
