import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { Complaint, ComplaintFilters } from '../../types';
import { getComplaints } from '../../utils/complaintUtils';
import ComplaintActions from '../complaints/ComplaintActions';
import { getRequest } from '../../utils/apiConnector';
import { API_ENDPOINTS } from '../../utils/apis';
interface ComplaintListProps {
  filters: ComplaintFilters;
  onFilterChange: (filters: Partial<ComplaintFilters>) => void;
}

const ComplaintList: React.FC<ComplaintListProps> = ({ filters, onFilterChange }) => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const filteredComplaints = await getRequest(API_ENDPOINTS.GET_ALL_COMPLAINTS, filters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(filteredComplaints.data);
      setComplaints(filteredComplaints.data.complaints);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setLoading(false);
    }
  }
  useEffect(() => {
    // In a real app, this would be an API call with the filters
    fetchComplaints();
  }, [filters]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value });
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-') as [
      'date' | 'status' | 'urgency',
      'asc' | 'desc'
    ];
    onFilterChange({ sortBy, sortOrder });
  };
  
  const getSortValue = () => {
    return `${filters.sortBy}-${filters.sortOrder}`;
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };
  
  const getUrgencyBadge = (urgency: string) => {
    const colorMap = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[urgency.toLowerCase() as keyof typeof colorMap]}`}>
        {urgency}
      </span>
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Filter className="h-5 w-5 text-purple-600 mr-2" />
        Complaint Management
      </h2>
      
      {complaints.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No complaints found matching your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID & Complainant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.complaintId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex justify-start items-start w-full gap-2">
                        <div className="text-sm font-medium text-gray-900">
                          {complaint.complaintId}
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="text-sm text-gray-500">
                              {complaint.title}
                            </div>
                            <div className="mt-1">
                              {getUrgencyBadge(complaint.priority)}
                            </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {complaint.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(complaint.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(complaint.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/complaints/${complaint._id}`}
                        className="text-purple-600 hover:text-purple-900 flex items-center"
                      >
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                      
                      <ComplaintActions 
                        complaint={complaint} 
                        onUpdate={() => {
                          fetchComplaints();
                        }}
                      />
                    </div>
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

export default ComplaintList;