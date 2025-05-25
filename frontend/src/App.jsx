import React, { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import setupAxiosInterceptors from './utils/axiosConfig';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    setupAxiosInterceptors();

    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return <AppRouter />;
};

export default App;
