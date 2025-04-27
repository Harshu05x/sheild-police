import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBackButton = false,
  title = "SHEild Police Dashboard"
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header showBackButton={showBackButton} title={title} />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      <footer className="bg-navy-900 text-white text-center py-4 text-xs">
        <p>© 2025 SHEild - Women's Safety Initiative</p>
      </footer>
    </div>
  );
};

export default Layout;