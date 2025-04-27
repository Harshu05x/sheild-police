import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-800 to-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <LoginForm />
        <div className="mt-8 text-center text-white text-sm">
          <h3 className="font-semibold mb-2">SHEild - Women's Safety Initiative</h3>
          <p className="text-gray-300">
            A dedicated platform for handling women's safety complaints with care and efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;