import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ListPage from './pages/ListPage';
import BreachFormPage from './pages/BreachFormPage';
import LoginPage from './pages/LoginPage';

function NavBar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Data Breach Response Manager</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <button 
                onClick={logout}
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                Logout ({user.username})
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <NavBar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <ListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <BreachFormPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit/:id" 
                element={
                  <ProtectedRoute>
                    <BreachFormPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
