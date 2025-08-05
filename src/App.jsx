import React from 'react';
import { ToastContainer } from 'react-toastify';
import { TripProvider } from './context/TripContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TripProvider>
      <div className="App">
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="backdrop-blur-sm"
        />
      </div>
    </TripProvider>
  );
}

export default App;
