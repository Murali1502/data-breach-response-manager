import { useState, useEffect } from 'react';
import api from '../services/api';

const ListPage = () => {
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreaches = async () => {
      try {
        // We will call the real GET /all API once the backend is ready.
        // For now, this points to where the API will be.
        const response = await api.get('/api/breaches/all');
        setBreaches(response.data.content || response.data);
      } catch (err) {
        // As the backend is not running yet, we expect an error or empty state
        setError('Failed to load data. The backend server might be offline.');
        setBreaches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBreaches();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Data Breaches</h1>
      
      {loading && (
        <div className="flex justify-center items-center h-32">
          <p className="text-xl text-gray-500">Loading data...</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && breaches.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 text-gray-600 px-4 py-8 rounded text-center">
          <p className="text-lg">No data breach records found.</p>
        </div>
      )}

      {!loading && !error && breaches.length > 0 && (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Title</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Severity</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reported Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {breaches.map((breach) => (
                <tr key={breach.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{breach.title}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{breach.status}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{breach.severity}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(breach.reported_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListPage;
