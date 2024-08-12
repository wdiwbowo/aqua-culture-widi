import axios from 'axios';

// Membuat instance axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: 'https://sso.pptik.id/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menambahkan interceptor untuk menyertakan token atau menangani kesalahan
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('appToken'); // Pastikan kunci token konsisten
    if (token) {
      console.log('Token found in local storage:', token); // Log token
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in local storage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi untuk GET request
export const fetchData = async (endpoint) => {
  try {
    const token = localStorage.getItem('appToken'); // Ambil token
    const response = await apiClient.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized. Please check your authentication token.');
        // Opsional: tangani penyegaran token atau alihkan ke login
      } else {
        console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      }
    } else {
      console.error('Error fetching data:', error);
    }
    throw error;
  }
};

// Fungsi untuk POST request dengan JSON
export const postData = (endpoint, data, contentType = 'application/json') => {
  return apiClient.post(endpoint, data, {
    headers: {
      'Content-Type': contentType,
    },
  });
};

// Fungsi untuk POST request dengan x-www-form-urlencoded
export const postFormData = (endpoint, data) => {
  return apiClient.post(endpoint, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      email,
      password,
      guidAplication: 'PROJECT-9f843f72-d4a4-4ab6-92ad-0b4cf1c4dce2-2024',
    });
    console.log('Login response:', response.data); // Tambahkan log
    const { token } = response.data;
    if (token) {
      localStorage.setItem('appToken', token); // Simpan token di localStorage
      console.log('Token stored in local storage:', token); // Log token
    } else {
      console.error('Login failed: No token received');
    }
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Fungsi untuk pendaftaran
export const register = (data) => {
  return apiClient.post('/users/register', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

// Fungsi untuk mendapatkan profil pengguna                                          
export const getUserProfile = async () => {
  const token = localStorage.getItem('userToken');
  console.log('Ini Token', token)

  if (!token) {
    throw new Error('No token found, please log in.');
  }

  try {
    const config = `{headers: {Authorization: Bearer ${token}}} : {}`
    const response = await apiClient.get('/users/profile',config);
    return response;
  } catch (error) {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     // Opsional: tangani penyegaran token atau alihkan ke login
    //     throw new Error('Unauthorized access. Please log in again.');
    //   }
    //   throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    // } else {
    //   throw new Error('Failed to fetch profile. Please try again.');
    // }
  }
};
