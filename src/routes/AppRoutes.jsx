import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';


import Landing from '../pages/Landing';
import Planner from '../pages/Planner';
import Itinerary from '../pages/Itinerary';
import Packing from '../pages/Packing';
import SavedTrips from '../pages/SavedTrips';
import Settings from '../pages/Settings';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="planner" element={<Planner />} />
          <Route path="itinerary/:tripId" element={<Itinerary />} />
          <Route path="packing/:tripId" element={<Packing />} />
          <Route path="trips" element={<SavedTrips />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;