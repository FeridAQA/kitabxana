import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // id parametresini alırıq
    console.log("Book ID:", id); // id-nin dəyərini yoxlamaq üçün log edin

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/book/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError('Kitab məlumatlarını yükləmək mümkün olmadı.');
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <div>Yüklənir...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mb-10 bg-white text-black">
            <div className="container mx-auto px-4 py-6 bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <i className="fas fa-book text-black text-3xl mr-2"></i>
                    <h2 className="text-3xl font-bold text-black mb-4">Kitab Detalları</h2>
                </div>
                <div className="border-t-4 border-black mt-2"></div>
            </div>
            <div className="container mx-auto px-28 mt-6">
                <div className="card card-side bg-white shadow-xl overflow-hidden">
                    <figure className="w-1/3">
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <div className="card-body w-2/3 p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg">
                        <h3 className="card-title text-3xl font-bold mb-4 text-indigo-800">{book.title}</h3>
                        <p className="text-lg text-gray-900 mb-2 flex-wrap break-words">{book.author}</p>
                        <p className="text-lg text-gray-800 mb-4 flex-wrap break-words">{book.description}</p>
                        <p className="text-lg text-gray-700 mb-2">Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
                        <p className="text-lg text-gray-700 mb-4">Language: {book.language}</p>
                        <div className="mt-4">
                            <div className="price-and-sold mb-4 flex justify-between items-center">
                                <p className="font-semibold text-2xl text-green-800">${book.purchasePrice}</p>
                                
                            </div>
                            
                            <div className="mb-4">
                                <p className="font-semibold text-lg text-blue-700 bg-blue-200 px-2 py-1 rounded break-words">
                                    {console.log("feridddd",book.categories)}
                                    {book.categories ? book.categories.name : 'Yoxdur'}
                                </p>
                            </div>
                            <div className="card-actions justify-end space-x-4">
                                <button className="btn bg-red-700 text-white hover:bg-red-800 text-lg">
                                    <i className="fas fa-shopping-basket mr-2"></i> Basket
                                </button>
                                <button className="btn bg-purple-700 text-white hover:bg-purple-800 text-lg">
                                    <i className="fas fa-heart mr-2"></i> Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Detail;
