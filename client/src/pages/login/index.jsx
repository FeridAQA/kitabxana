import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import config from '../../config';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [modal, setModal] = useState({ isOpen: false, message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`${config.BASE_URL}/auth/login`, formData);
    
            if (response.data.token) {
                const expireTime = Date.now() + 3 * 60 * 60 * 1000; // 3 saatlıq müddət
                localStorage.setItem('token', response.data.token); // Token-i yaddaşa yazır
                localStorage.setItem('tokenExpireTime', expireTime.toString()); // Tokenin bitmə vaxtını yaddaşa yazır
                console.log('Token saved with expire time:', expireTime);
                navigate('/'); // Uğurlu login sonrası ana səhifəyə yönləndirir
            }
        } catch (error) {
            let errorMessage;
    
            if (error.response && error.response.status === 401) {
                errorMessage = error.response.data.message || 'Email və ya parol yanlışdır';
            } else if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else {
                errorMessage = 'Giriş zamanı bir xəta baş verdi. Xahiş edirik, yenidən cəhd edin.';
            }
    
            setModal({ isOpen: true, message: errorMessage });
            console.error('Error logging in user:', error);
        }
    };
    
    

    const closeModal = () => setModal({ ...modal, isOpen: false });

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-black relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 text-white bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-500"
            >
                Home
            </button>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="pl-4 block w-full rounded-md border-0 py-1.5 text-white placeholder-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                className="pl-4 block w-full rounded-md border-0 py-1.5 text-white placeholder-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/singin')}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Don’t have an account? Register
                    </button>
                </div>
            </div>

            <Modal isOpen={modal.isOpen} onClose={closeModal} message={modal.message} />
        </div>
    );
}

export default Login;
