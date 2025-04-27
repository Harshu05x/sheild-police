import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import { Complaint } from '../../types';
import { resolveComplaint, rejectComplaint } from '../../utils/complaintUtils';

interface ComplaintDetailProps {
  complaint: any;
}

const ComplaintDetail: React.FC<ComplaintDetailProps> = ({ complaint }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleResolve = () => {
    if (!comments.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    resolveComplaint(complaint.id, comments);
    
    // Redirect back to dashboard after successful update
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    rejectComplaint(complaint.id, rejectionReason);
    
    // Redirect back to dashboard after successful update
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center text-yellow-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Pending</span>
          </div>
        );
      case 'resolved':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Resolved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getUrgencyBadge = (urgency: string) => {
    const classes = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${classes[urgency as keyof typeof classes]}`}>
        {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center">
            {getStatusBadge(complaint.status)}
            <span className="mx-3 text-gray-300">|</span>
            {getUrgencyBadge(complaint.priority)}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Submitted: {formatDate(complaint.createdAt)}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Complaint #{complaint.complaintId}
          </h1>
          <div className="flex items-center text-gray-700">
            <User className="h-4 w-4 mr-1" />
            <span>Reported by: <strong>{complaint.userId.firstName} {complaint.userId.lastName}</strong></span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Complaint Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
        </div>
        
        {complaint.userId.contactNumber && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2 cursor-pointer" onClick={() => window.location.href = `tel:${complaint.userId.contactNumber}`}/>
              <span>{complaint.userId.contactNumber}</span>
            </div>
          </div>
        )}
        
        {complaint.status === 'resolved' && complaint.response && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-6">
            <h3 className="font-medium text-green-900 flex items-center mb-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolution Details
            </h3>
            <p className="text-green-800">{complaint.response}</p>
            {complaint.updatedAt && (
              <p className="mt-2 text-sm text-green-700">
                Resolved on: {formatDate(complaint.updatedAt)}
              </p>
            )}
          </div>
        )}
        
        {complaint.status === 'rejected' && complaint.response && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
            <h3 className="font-medium text-red-900 flex items-center mb-2">
              <XCircle className="h-4 w-4 mr-2" />
              Rejection Response
            </h3>
            <p className="text-red-800">{complaint.response}</p>
            {complaint.updatedAt && (
              <p className="mt-2 text-sm text-red-700">
                Rejected on: {formatDate(complaint.updatedAt)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetail;