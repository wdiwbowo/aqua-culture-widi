import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // pastikan impor useNavigate
import NavbarAdmin from '../components/NavbarAdmin';
import { getUserProfile } from '../services/apiService';

const UserProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // inisialisasi useNavigate

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setUserProfile(response.data);
                console.log(response)
                // localStorage.setItem('userProfile', JSON.stringify(response.data)); // Simpan profil pengguna
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch profile:', error);
                if (error.message.includes('Unauthorized')) {
                    // navigate('/login'); // Arahkan ke halaman login jika tidak authorized
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSidebarToggle = (newState) => {
        setIsSidebarOpen(newState);
    };

    return (
        <div className={`flex min-h-screen bg-gray-800 text-black transition-all duration-300`}>
            <div className={`bg-gray-900 ${isSidebarOpen ? 'w-60' : 'w-16'} transition-all duration-300`}>
                <NavbarAdmin onSidebarToggle={handleSidebarToggle} />
            </div>
            
            <div className={`flex-1 p-10 transition-all duration-300 flex justify-center items-center`}>
                <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full border-4 border-gray-700 flex items-center justify-center bg-gray-300">
                                <svg className="w-24 h-24 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left w-full">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-lg"><span className="font-semibold">Name:</span> {userProfile.name}</p>
                                    <p className="text-lg"><span className="font-semibold">Email:</span> {userProfile.email}</p>
                                </div>
                                <div>
                                    <p className="text-lg"><span className="font-semibold">Number:</span> {userProfile.phoneNumber}</p>
                                    <p className="text-lg"><span className="font-semibold">Role:</span> {userProfile.role}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-lg">Edit</button>
                                <button className="bg-black text-white px-4 py-2 rounded ml-4 hover:bg-gray-800 text-lg">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;