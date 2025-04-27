import { users } from './mockData';

export const authenticate = (username: string, password: string) => {
  // In a real app, this would make an API call to verify credentials
  // For demo purposes, we're using mock data and a simple check
  // Password would be 'password' for all demo accounts
  const user = users.find((u) => u.username === username);
  
  if (user && password === 'password') {
    return { success: true, user };
  }
  
  return { success: false, message: 'Invalid username or password' };
};

