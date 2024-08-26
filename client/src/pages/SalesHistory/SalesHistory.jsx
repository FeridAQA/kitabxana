import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
      await axios.delete(`http://localhost:3000/api/porchase/${id}`, {
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
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Satış Tarixçəsi</h2>
      <div className="border-t-4 border-indigo-600 mt-2 mb-6"></div>
      {sales.length === 0 ? (
        <p>Heç bir satış tapılmadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-fixed">
            <thead className=''>
              <tr className="bg-indigo-600 text-white ">
                <th className="w-2/12 py-4 pl-20">Kitab Adı</th>
                <th className="w-1/12 py-2 pl-10">Miqdar</th>
                <th className="w-2/12 py-2 pl-24">Qiymət</th>
                <th className="w-2/12 py-2 pl-20">Ümumi Məbləğ</th>
                <th className="w-2/12 py-2 pl-20">Satınalma Tarixi</th>
                <th className="w-3/12 py-2 pl-40">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id} className="text-center hover:bg-gray-100">
                  <td className="py-2">{sale.bookId.title}</td>
                  <td className="py-2">{sale.quantity}</td>
                  <td className="py-2">${sale.price}</td>
                  <td className="py-2">${sale.totalAmount}</td>
                  <td className="py-2">
                    {new Date(sale.purchaseDate).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-2 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/sales-history/${sale._id}`)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
