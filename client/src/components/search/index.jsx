import React from 'react';
import { useAppContext } from '../../context/App.contex';

function Search() {
    const { searchData } = useAppContext();

    if (!searchData || searchData.length === 0) {
        return null; // Əgər data yoxdursa, heç bir şey render olunmasın
    }

    return (
        <div id="H_all" className="mb-10 bg-white text-black">
            <div className="container mx-auto px-4 py-6 bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <i className="fas fa-search text-black text-3xl mr-2"></i>
                    <h2 className="text-2xl font-bold text-black mb-4">Axtarış Nəticələri</h2>
                </div>
                <div className="border-t-4 border-black mt-2"></div>
            </div>
            <div className="container mx-auto px-28 mt-6">
                <div className="flex flex-wrap justify-center gap-8 p-5">
                    {searchData.map((item, index) => (
                        <div
                            key={index}
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
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-700 mb-1 truncate">
                                    {item.author}
                                </p>

                                <div className="mt-auto">
                                    <div className="price-and-sold mb-2 flex justify-between items-center">
                                        <p className="font-semibold text-lg text-green-600">
                                            ${item.purchasePrice}
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
        </div>
    );
}

export default Search;
