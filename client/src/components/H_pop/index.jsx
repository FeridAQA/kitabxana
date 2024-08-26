import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
// import './index.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function H_pop() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${config.BASE_URL}/popular`;

            try {
                const response = await axios.get(url);
                setBooks(response.data);
                console.log("pop", response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id='H_Pop' className="bg-gradient-to-r from-blue-500 to-indigo-600 pb-5">
            <div className="container mx-auto my-0 px-4 py-3 bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex items-center ">
                    <i className="fas fa-star text-white text-3xl mr-2"></i>
                    <h2 className="text-3xl font-bold text-white ">Ən Populyar</h2>
                </div>
                    <div className="border-t-4 border-white mt-2"></div>
            </div>

            <div className="container mx-auto px-28 mt-6">
                <Swiper
                    slidesPerView={4}
                    centeredSlides={false}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        1200: { slidesPerView: 4 },
                        600: { slidesPerView: 2 },
                        0: { slidesPerView: 1 },
                    }}
                >
                    {books.length > 0 ? (
                        books.map((book) => (
                            <SwiperSlide key={book._id}>
                                <div className="card bg-white shadow-xl min-w-[280px] max-w-[280px] min-h-[430px] max-h-[430px] flex flex-col group rounded-lg">
                                    <div className="relative">
                                        <figure className="h-60 overflow-hidden rounded-t-lg">
                                            <img
                                                src={book.bookImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                            />
                                        </figure>
                                        <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                                            <div className="card-actions mb-4 space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <button className="btn btn-primary btn-circle">
                                                    <i className="fas fa-info-circle"></i>
                                                </button>
                                                <button className="btn btn-secondary btn-circle">
                                                    <i className="fas fa-shopping-cart"></i>
                                                </button>
                                                <button className="btn btn-warning btn-circle">
                                                    <i className="fas fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body flex flex-col justify-between p-4 bg-gray-100 rounded-b-lg flex-1">
                                        <h3 className="card-title text-xl font-bold mb-2 truncate">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-1 truncate">
                                            {book.author}
                                        </p>

                                        <div className="price-and-sold mb-2 flex justify-between items-center">
                                            <p className="font-semibold text-lg text-green-600">
                                                ${book.price}
                                            </p>
                                            <p className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded truncate">
                                                rating: {book.averageRating ? book.averageRating : 'No rating'}
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <p className="font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded truncate">
                                                {book.categories && book.categories.name ? book.categories.name : 'Yoxdur'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </Swiper>
            </div>
        </div>


    );
}

export default H_pop;
