import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import BreachFormPage from './pages/BreachFormPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-blue-600">Data Breach Response Manager</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/create" element={<BreachFormPage />} />
            <Route path="/edit/:id" element={<BreachFormPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
