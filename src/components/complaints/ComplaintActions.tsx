import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { postRequest } from '../../utils/apiConnector';
import { API_ENDPOINTS } from '../../utils/apis';
interface ComplaintActionsProps {
  complaint: any;
  onUpdate: () => void;
}

const ComplaintActions: React.FC<ComplaintActionsProps> = ({ complaint, onUpdate }) => {
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [comments, setComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  
  const handleResolve = async () => {
    if (comments.trim()) {
      try {
        await postRequest(API_ENDPOINTS.UPDATE_COMPLAINT_STATUS, {
          id: complaint._id,
          status: 'resolved',
          comments: comments
        },);
        setShowResolveModal(false);
        setComments('');
        onUpdate();
      } catch (error) {
        console.error('Error resolving complaint:', error);
      }
    }
  };
  
  const handleReject = async () => {
    if (rejectionReason.trim()) {
      try {
        await postRequest(API_ENDPOINTS.UPDATE_COMPLAINT_STATUS, {
          id: complaint._id,
          status: 'rejected',
          comments: rejectionReason
        },);
        setShowRejectModal(false);
        setRejectionReason('');
        onUpdate();
      } catch (error) {
        console.error('Error rejecting complaint:', error);
      }
    }
  };
  
  // Only show action buttons for pending complaints
  if (complaint.status !== 'pending') {
    return null;
  }
  
  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowResolveModal(true)}
          className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors flex items-center text-xs"
        >
          <CheckCircle className="h-3 w-3 mr-1" /> Resolve
        </button>
        <button
          onClick={() => setShowRejectModal(true)}
          className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors flex items-center text-xs"
        >
          <XCircle className="h-3 w-3 mr-1" /> Reject
        </button>
      </div>
      
      {/* Resolve Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-start">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resolve Complaint</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 text-wrap">
                You are about to mark this complaint as resolved. Please provide any necessary comments.
              </p>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Explain the resolution..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResolveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResolve}
                disabled={!comments.trim()}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-start">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Complaint</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 text-wrap">
                You are about to reject this complaint. Please provide a reason for rejection.
              </p>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for rejection..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintActions;