import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../services/apiService';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (email === "" || password === "") {
        setErrorMessage('Email dan password harus diisi.');
        return;
    }

    try {
        const response = await login(email, password);
        console.log(response.data.success)
        if (response.data.success) {
            // const userProfile = {
            //     name: response.data.data.name,
            //     email: response.data.data.email,
            //     phoneNumber: response.data.data.phoneNumber,
            //     role: response.data.data.role,
            // };
            // console.log(response.data.data.appToken)
            // console.log(response.data.data.userToken)
            localStorage.setItem('appToken', response.data.data.appToken); // Ensure correct key
            localStorage.setItem('userToken', response.data.data.userToken);
            if (keepLoggedIn) {
                localStorage.setItem('keepLoggedIn', 'true');
            }
            navigate("/dashboard");
        } else {

            setErrorMessage('Login gagal. Periksa kembali kredensial Anda.');
        }
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.message || 'Login gagal. Silakan coba lagi.');
        } else if (error.request) {
            setErrorMessage('Tidak ada respons dari server. Silakan coba lagi nanti.');
        } else {
            setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
        }
    }
};
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight text-gray-900">LOGIN</h1>
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                placeholder=" "
                required
              />
              <label className="absolute top-2 left-2 text-gray-500 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2">
                Email
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                placeholder=" "
                required
              />
              <label className="absolute top-2 left-2 text-gray-500 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2">
                Password
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {passwordVisible ? (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M12 5.5C7.5 5.5 4.5 8.5 4.5 12s3 6.5 7.5 6.5 7.5-3 7.5-6.5S16.5 5.5 12 5.5Z" className="fill-slate-400"></path>
                    <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" className="fill-slate-400"></path>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M12 5.5C7.5 5.5 4.5 8.5 4.5 12s3 6.5 7.5 6.5 7.5-3 7.5-6.5S16.5 5.5 12 5.5Z" className="fill-transparent"></path>
                    <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" className="fill-transparent"></path>
                    <path d="M3 12s3 6 9 6 9-6 9-6-3-6-9-6S3 12 3 12Z" className="stroke-slate-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-600 rounded"
                />
                <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-900">
                  Keep me logged in
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5">
              Login
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Belum punya akun? <Link to="/register" className="font-medium text-primary-600 hover:underline">Buat akun</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
