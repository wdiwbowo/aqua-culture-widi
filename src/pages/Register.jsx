import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert("Anda harus menyetujui syarat dan ketentuan.");
            return;
        }
        // Tambahkan logika pendaftaran di sini

        // Navigasi ke halaman login setelah pendaftaran berhasil
        navigate("/login");
    };

    return (
        <div className="bg-gray-900 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Buat Akun
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="firstName"
                                        className="absolute top-2 left-2 text-gray-500 dark:text-gray-400 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                    >
                                        First Name
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="lastName"
                                        className="absolute top-2 left-2 text-gray-500 dark:text-gray-400 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                    >
                                        Last Name
                                    </label>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="usernameEmail"
                                    id="usernameEmail"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="usernameEmail"
                                    className="absolute top-2 left-2 text-gray-500 dark:text-gray-400 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Username atau Email
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute top-2 left-2 text-gray-500 dark:text-gray-400 transform -translate-y-1/2 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:left-2 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {passwordVisible ? (
                                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                                            <path d="M12 5.5C7.5 5.5 4.5 8.5 4.5 12s3 6.5 7.5 6.5 7.5-3 7.5-6.5S16.5 5.5 12 5.5Z" className="fill-slate-400 dark:fill-slate-500"></path>
                                            <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" className="fill-slate-400 dark:fill-slate-500"></path>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                                            <path d="M12 5.5C7.5 5.5 4.5 8.5 4.5 12s3 6.5 7.5 6.5 7.5-3 7.5-6.5S16.5 5.5 12 5.5Z" className="fill-transparent"></path>
                                            <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" className="fill-transparent"></path>
                                            <path d="M3 12s3 6 9 6 9-6 9-6-3-6-9-6S3 12 3 12Z" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 rounded"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Saya setuju dengan <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Syarat dan Ketentuan</a>
                                </label>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Daftar</button>
                        </form>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Sudah punya akun? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
