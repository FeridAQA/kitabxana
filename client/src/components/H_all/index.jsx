import React, { useEffect, useState } from 'react';
import config from '../../config';

function H_all() {
  const [books, setBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/book?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        if (offset === 0) {
          setBooks(data);
        } else {
          setBooks(prevBooks => [...prevBooks, ...data]);
        }
      } catch (error) {
        console.error("Kitablar yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchBooks();
  }, [offset, limit]);

  const loadMoreBooks = () => {
    setOffset(prevOffset => prevOffset + 10);
    setLimit(10);
  };

  return (
    <div className="mb-10 bg-white text-black">
      <div className="container mx-auto px-4 py-6 bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-book text-black text-3xl mr-2"></i>
          <h2 className="text-2xl font-bold text-black mb-4">Son Kitablar</h2>
        </div>
        <div className="border-t-4 border-black mt-2"></div>
      </div>
      <div className="container mx-auto px-28 mt-6">
        <div className="flex flex-wrap justify-center gap-8 p-5">
          {books.map((book) => (
            <div
              key={book._id}
              className="card bg-white shadow-xl min-w-[280px] max-w-[280px] min-h-[420px] max-h-[420px] flex flex-col group"
            >
              <div className="relative">
                <figure className="h-60 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                </figure>
                <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              <div className="card-body flex flex-col justify-between p-4 bg-gray-100 rounded-lg flex-1">
                <h3 className="card-title text-xl font-bold mb-2 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-700 mb-1 truncate">
                  {book.author}
                </p>

                <div className="mt-auto">
                  <div className="price-and-sold mb-2 flex justify-between items-center">
                    <p className="font-semibold text-lg text-green-600">
                      ${book.purchasePrice}
                    </p>
                    <p className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded truncate">
                      rating: {book.rating ? book.rating : 'No rating'}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded truncate">
                      {book.categories && book.categories.name
                        ? book.categories.name
                        : 'Yoxdur'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            id="daha"
            onClick={loadMoreBooks}
            className="btn btn-success"
          >
            Daha çox
          </button>
        </div>
      </div>
    </div>
  );
}

export default H_all;
