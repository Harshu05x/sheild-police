import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import StatisticsPanel from '../components/dashboard/StatisticsPanel';
import ComplaintList from '../components/dashboard/ComplaintList';
import { ComplaintFilters } from '../types';

const DashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<ComplaintFilters>({
    search: '',
    status: 'All',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  
  const handleFilterChange = (newFilters: Partial<ComplaintFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <StatisticsPanel />
        <ComplaintList filters={filters} onFilterChange={handleFilterChange} />
      </div>
    </Layout>
  );
};

export default DashboardPage;