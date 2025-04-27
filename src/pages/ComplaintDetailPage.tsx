import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ComplaintDetail from '../components/complaints/ComplaintDetail';
import { getComplaintById } from '../utils/complaintUtils';
import { Complaint } from '../types';
import { AlertCircle } from 'lucide-react';
import { getRequest } from '../utils/apiConnector';
import { API_ENDPOINTS } from '../utils/apis';

const ComplaintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); 

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await getRequest(API_ENDPOINTS.GET_COMPLAINT_BY_ID, { id: id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      setComplaint(response.data.complaint);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchComplaint();
    }
  }, [id]);
  
  if (loading) {
    return (
      <Layout showBackButton title="Loading Complaint...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-purple-600">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (error || !complaint) {
    return (
      <Layout showBackButton title="Complaint Not Found">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
          <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="text-red-700 mt-1">{error || 'Complaint not found'}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 bg-navy-700 text-white rounded-md hover:bg-navy-800 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout showBackButton title={`Complaint #${complaint.complaintId}`}>
      <div className="animate-fade-in">
        <ComplaintDetail complaint={complaint} />
      </div>
    </Layout>
  );
};

export default ComplaintDetailPage;