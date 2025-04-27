import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { postRequest } from '../../utils/apiConnector';
import { API_ENDPOINTS } from '../../utils/apis';
const LoginForm: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, setUserData, setIsAuthenticatedData, setTokenData } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!mobile.trim() || !password.trim()) {
        toast.error('Both mobile number and password are required');
        setIsLoading(false);
        return;
      }
      // check if mobile number is valid
      if (!/^\d{10}$/.test(mobile)) {
        toast.error('Invalid mobile number');
        setIsLoading(false);
        return;
      }

      const res =   await postRequest( API_ENDPOINTS.LOGIN, {mobile, password});
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setUserData(res.data.user);
      setIsAuthenticatedData(true);
      setTokenData(res.data.token);
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.log(error);
      let msg = error?.response?.data?.message || 'Login failed';
      toast.error(msg);
      setIsLoading(false);
      return;
    }    
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <ShieldAlert className="h-12 w-12 text-purple-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">SHEild Police Portal</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the dashboard</p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              autoComplete="mobile"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="9876543210"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Logging in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;