import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Token tapılmadı. Xahiş olunur yenidən daxil olun.");
        }

        const response = await axios.get('http://localhost:3000/api/porchase', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSales(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSalesHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.BASE_URL}/porchase/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSales(sales.filter(sale => sale._id !== id));
    } catch (error) {
      console.error('Silmə zamanı xəta baş verdi:', error);
      setError('Silmə zamanı xəta baş verdi.');
    }
  };

  if (loading) {
    return <p>Yüklənir...</p>;
  }

  if (error) {
    return <p>Xəta: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Satış Tarixçəsi</h2>
      <div className="border-t-4 border-indigo-600 mt-2 mb-6"></div>
      {sales.length === 0 ? (
        <p className="text-white">Heç bir satış tapılmadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-white bg-black">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th>Kitab Adı</th>
                <th>Miqdar</th>
                <th>Qiymət</th>
                <th>Ümumi Məbləğ</th>
                <th>Satınalma Tarixi</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, saleIndex) => (
                sale.books.map((book, bookIndex) => (
                  <tr key={`${sale._id}-${bookIndex}`} className="hover:bg-gray-700">
                    <td>{book.bookId.title}</td>
                    <td>{book.quantity}</td>
                    <td>${book.price}</td>
                    <td>${book.totalAmount}</td>
                    <td>
                      {new Date(sale.purchaseDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/${book.bookId._id}`)}
                        className="btn btn-sm btn-outline btn-primary text-white"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(sale._id)}
                        className="btn btn-sm btn-outline btn-error text-white"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
