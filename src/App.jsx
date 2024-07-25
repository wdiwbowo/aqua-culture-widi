import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import Navbar from './components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.documentElement.classList.toggle('dark', savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);
    return (
        <>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            {/* Dark section with icons, stats, and map */}
            <section className={`py-28 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
                            Use SAQTI to Power Your Next
                        </h1>
                        <h1 className={`text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl ${darkMode ? 'text-[#1E88E5]' : 'text-blue-600'}`}>
                            React Project
                        </h1>
                        <p className="mt-6 text-lg">
                            SAQTI is a React-based dashboard template which helps you to build faster and beautiful web applications.
                        </p>
                        <div className="mt-8 flex space-x-4">
                            <a
                                href="/Login"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg transition duration-300"
                            >
                                Live Preview
                            </a>
                            <a
                                href="#"
                                className="inline-block border border-gray-400 text-gray-400 hover:text-white py-3 px-5 rounded-lg transition duration-300"
                            >
                                Purchase Now
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0">
                        <img
                            src="https://png.pngtree.com/background/20230809/original/pngtree-aquaculture-aquaculture-farm-fishery-photo-picture-image_4542008.jpg"
                            alt="Dashboard Preview"
                            className="mx-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Cards section */}
            <section className={`py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-yellow-500 rounded-lg shadow">
                        <h2 className="text-4xl font-bold mb-2 text-white dark:text-gray-900">TEKNOLOGI</h2>
                        <p className="text-lg text-white dark:text-gray-700">Placeholder text or content here.</p>
                        <a
                            href="/Teknologi"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Read More
                            <svg className="ml-2 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    <div className="p-6 bg-red-500 rounded-lg shadow">
                        <h2 className="text-4xl font-bold mb-2 text-white dark:text-gray-900">LAYANAN</h2>
                        <p className="text-lg text-white dark:text-gray-700">Placeholder text or content here.</p>
                        <a
                            href="/Layanan"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Read More
                            <svg className="ml-2 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    <div className="p-6 bg-purple-500 rounded-lg shadow">
                        <h2 className="text-4xl font-bold mb-2 text-white dark:text-gray-900">DEVELOPER</h2>
                        <p className="text-lg text-white dark:text-gray-700">Placeholder text or content here.</p>
                        <a
                            href="/Developer"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Read More
                            <svg className="ml-2 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Map section */}
            <section className={`py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="max-w-screen-xl mx-auto p-6 border rounded-lg shadow relative">
                    <MapContainer center={[-7.4507, 108.2412]} zoom={13} style={{ height: '300px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[-7.4507, 108.2412]}>
                            <Popup>
                                Pantai Cipatujah, Tasikmalaya <br /> Pantai indah di pesisir selatan Jawa Barat.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>
        </>
    );
}