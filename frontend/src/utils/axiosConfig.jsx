import axios from 'axios';

const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem('refresh_token')
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const res = await axios.post('/api/token/refresh/', { refresh: refreshToken });

          const newAccess = res.data.access;
          localStorage.setItem('access_token', newAccess);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;

          originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
          return axios(originalRequest);
        } catch (refreshErr) {
          console.error('Refresh token inválido. Redirigiendo al login.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
