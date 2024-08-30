import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/App.contex';
import config from '../../config';

function Basket() {
    const { basket, removeFromBasket, clearBasket, addToBasket, removeAllFromBasket } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal üçün state
    const [error, setError] = useState(null); // Xəta üçün state

    const totalPrice = basket.reduce((total, item) => total + item.purchasePrice * item.count, 0);

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token tapılmadı. Xahiş olunur yenidən daxil olun.');
            return;
        }

        const books = basket.map(item => ({
            bookId: item._id,
            quantity: item.count
        }));

        try {
            const response = await axios.post(`${config.BASE_URL}/porchase`, { books }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            clearBasket(); // Səbəti təmizlə
            setIsModalOpen(false); // Modalı bağla
            alert('Ödəmə uğurla tamamlandı!'); // Uğurlu mesajı
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Backend-dən gələn mesajı göstər
            } else {
                setError('Ödəniş zamanı xəta baş verdi.'); // Ümumi xəta mesajı
            }
        }
    };

    return (
        <div className="mb-10 bg-white text-black">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Əməliyyatı həyata keçirməkdə əminsinizmi?</h3>
                        {error && <p className="text-red-600 mb-4">{error}</p>} {/* Xəta mesajı */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-full"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="btn bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-full"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Səbət məzmunu */}
            <div className="container mx-auto px-4 py-6 bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-shopping-cart text-indigo-600 text-3xl mr-2"></i>
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Səbət</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-xl font-bold text-indigo-800">
                            Ümumi Qiymət: ${totalPrice.toFixed(2)}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)} // Modalı açır
                            className="btn bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-full"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={clearBasket}
                            className="btn bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-full"
                        >
                            Səbəti Təmizlə
                        </button>
                    </div>
                </div>
                <div className="border-t-4 border-indigo-600 mt-2"></div>
            </div>

            {/* Səbətdəki məhsullar */}
            <div className="container mx-auto px-28 mt-6">
                {basket.length === 0 ? (
                    <p className="text-center text-gray-500">Səbətiniz boşdur.</p>
                ) : (
                    <div>
                        <div className="flex flex-wrap justify-center gap-8 p-5">
                            {basket.map((item) => (
                                <div
                                    key={item._id}
                                    className="card bg-white shadow-xl min-w-[280px] max-w-[280px] min-h-[420px] max-h-[420px] flex flex-col group"
                                >
                                    <div className="relative">
                                        <figure className="h-60 overflow-hidden">
                                            <img
                                                src={item.coverImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                            />
                                        </figure>
                                        <div className="absolute inset-0 flex items-end justify-center bg-indigo-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="card-actions mb-4 space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <button
                                                    onClick={() => removeFromBasket(item._id)}
                                                    className="btn bg-red-500 hover:bg-red-700 text-white rounded-full"
                                                >
                                                    <i className="fas fa-minus-circle"></i>
                                                </button>
                                                <span className="text-white font-semibold">{item.count}</span>
                                                <button
                                                    onClick={() => addToBasket(item)}
                                                    className="btn bg-green-500 hover:bg-green-700 text-white rounded-full"
                                                >
                                                    <i className="fas fa-plus-circle"></i>
                                                </button>
                                                <button
                                                    onClick={() => removeAllFromBasket(item._id)}
                                                    className="btn bg-red-500 hover:bg-red-700 text-white rounded-full"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body flex flex-col justify-between p-4 bg-gray-100 rounded-lg flex-1">
                                        <h3 className="card-title text-xl font-bold mb-2 truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-1 truncate">
                                            {item.author}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="price-and-sold mb-2 flex justify-between items-center">
                                                <p className="font-semibold text-lg text-green-600">
                                                    ${item.purchasePrice * item.count}
                                                </p>
                                                <p className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded truncate">
                                                    rating: {item.rating ? item.rating : 'No rating'}
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded truncate">
                                                    {item.categories && item.categories.name
                                                        ? item.categories.name
                                                        : 'Yoxdur'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Basket;
