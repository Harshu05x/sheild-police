import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false,
  title = "SHEild Police Dashboard" 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="bg-navy-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className="p-1 rounded-full hover:bg-navy-800 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <div className="flex items-center">
              <ShieldAlert className="h-7 w-7 text-purple-400 mr-2" />
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center">
                <div className="hidden md:block mr-4">
                  <p className="text-sm text-gray-300">Welcome,</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;