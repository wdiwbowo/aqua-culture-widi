import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { register } from '../services/apiService'; // Adjust the import path as necessary

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert('Anda harus menyetujui syarat dan ketentuan.');
      return;
    }

    const formData = new FormData(event.target);

    const data = new URLSearchParams();
    data.append('email', formData.get('email'));
    data.append('password', formData.get('password'));
    data.append('phoneNumber', formData.get('phone'));
    data.append('name', formData.get('fullName'));
    data.append('guidAplication', 'PROJECT-9f843f72-d4a4-4ab6-92ad-0b4cf1c4dce2-2024');
    data.append('role', 'warga');

    // Generate a unique companyGuid for each registration
    const uniqueCompanyGuid = `COMPANY-${uuidv4()}-2024`;
    data.append('companyGuid', uniqueCompanyGuid);

    try {
      const response = await register(data);
      if (response.data.success) {
        setSuccessMessage('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
        
        // Optionally delay the navigation to let users see the message
        setTimeout(() => {
          navigate('/login');
        }, 3000); // 3 seconds delay
      } else {
        alert(response.data.message || 'Pendaftaran gagal, silakan coba lagi.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Pendaftaran gagal, silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Register</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Selamat Datang</p>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Masukkan detail akun untuk mendaftar.</p>
        </div>
        {successMessage && (
          <div className="text-center text-green-500">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <select
            name="institution"
            id="institution"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          >
            <option value="">Asal Instansi</option>
            <option value="PT. LSKK">PT. LSKK</option>
            <option value="Software Kreatife Indonesia">Software Kreatife Indonesia</option>
            <option value="PPTIK ITB">PPTIK ITB</option>
            <option value="PUSTEKHAN ITB">PUSTEKHAN ITB</option>
            <option value="Universitas Bandar Lampung (UBL)">Universitas Bandar Lampung (UBL)</option>
            <option value="Institut Teknologi Garut(ITG)">Institut Teknologi Garut(ITG)</option>
            <option value="Universitas Sangga Buana">Universitas Sangga Buana</option>
            <option value="Universitas Sriwijaya">Universitas Sriwijaya</option>
            <option value="FK Universitas Sriwijaya">FK Universitas Sriwijaya</option>
            <option value="Universitas Widyatama">Universitas Widyatama</option>
            <option value="FIK Universitas Bandar Lampung">FIK Universitas Bandar Lampung</option>
            <option value="Telkom Indonesia">Telkom Indonesia</option>
          </select>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder=" "
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer"
              required
            />
            <label
              htmlFor="fullName"
              className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 transform transition-all duration-300 -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Nama Lengkap
            </label>
          </div>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder=" "
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer"
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 transform transition-all duration-300 -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Telepon
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 transform transition-all duration-300 -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder=" "
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-1 text-gray-500 dark:text-gray-400 transform transition-all duration-300 -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-3 text-gray-600 dark:text-gray-400"
            >
              {passwordVisible ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" className="fill-none stroke-slate-400 dark:stroke-slate-500"></path>
                  <circle cx="12" cy="12" r="3" className="fill-slate-200 dark:fill-slate-600"></circle>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" className="fill-none stroke-slate-400 dark:stroke-slate-500"></path>
                  <path d="M4.73 4.73a9.91 9.91 0 0 0-3.32 4.03 1 1 0 0 0 .11.97l.01.01a10.1 10.1 0 0 0 1.28 1.53c.43.39.88.75 1.34 1.1l.01.01 1.18 1.18a9.63 9.63 0 0 0 4.84 1.92" className="fill-slate-200 dark:fill-slate-600"></path>
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I accept the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-primary-600 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
