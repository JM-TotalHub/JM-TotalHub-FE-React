import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PortfolioMainPage from './portfolio/PortfolioMainPage';
import SiteInfoPage from './site/SiteInfoPage';
import OverviewPage from './OverviewPage';

const Overview = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<OverviewPage />} />
        <Route path="/info/*" element={<SiteInfoPage />} />
        <Route path="/portfolio/*" element={<PortfolioMainPage />} />
      </Routes>
    </div>
  );
};

export default Overview;
