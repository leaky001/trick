import React from 'react';
import AppRoutes from './routes/AppRoutes';
import FavoritesProvider from './context/FavoritesContext'; // ✅ default import
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <FavoritesProvider>
      
        <AppRoutes />
      
    </FavoritesProvider>
  );
};

export default App;
