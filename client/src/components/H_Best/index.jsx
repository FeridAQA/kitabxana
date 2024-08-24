import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

import './H_Best.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Navigation modulu çıxarıldı
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function H_Best() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${config.BASE_URL}/bestsell`;

            try {
                const response = await axios.get(url);
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id='H_Best'>
            <div className="container">
            <h2>Ən Çox Satan</h2>
            </div>
            <div className='all-books-container'>
                <Swiper
                
                    slidesPerView={4}
                    centeredSlides={false}
                    spaceBetween={30}
                    pagination={{
                        clickable: true, // Pagination nöqtələrinin kliklənə bilən olması
                    }}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false, // İstifadəçi ilə qarşılıqlı təsirdən sonra autoplay dayanmır
                    }}
                    modules={[Autoplay, Pagination]} // Yalnız Autoplay və Pagination modulları istifadə edilir
                    className="mySwiper"
                    breakpoints={{
                        1200: {
                            slidesPerView: 4, // Geniş ekranlarda 3 slayd göstərilir
                        },
                        600: {
                            slidesPerView: 2, // Orta ekranlarda 2 slayd göstərilir
                        },
                        0: {
                            slidesPerView: 1, // Kiçik ekranlarda 1 slayd göstərilir
                        },
                    }}
                >
                    {books.length > 0 ? (
                        books.map((book) => (
                            <SwiperSlide key={book._id}>
                                <div className="book-item">
                                    <img className="book-cover" src={book.bookImage} alt={book.title} />
                                    <div className="book-details">
                                        <h2 className="book-title">{book.title}</h2>
                                        <p className="book-author">{book.author}</p>
                                        <p className="book-author">${book.price}</p>
                                        <p className="book-description">{book.description}</p>
                                        <p className="book-description">Total Sold: {book.totalSold}</p>
                                        <div className="book-actions">
                                            <button className="btn btn-primary">Buy Now</button>
                                            <button className="btn btn-secondary">Details</button>
                                            <button className="btn btn-wishlist">Add to Wishlist</button>
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

export default H_Best;
