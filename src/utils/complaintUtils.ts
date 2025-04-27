import { Complaint, ComplaintFilters } from '../types';
import { API_ENDPOINTS } from './apis';
import { getRequest } from './apiConnector';
import { complaints as mockComplaints } from './mockData';

// Mock complaints data - would be fetched from API in a real app
let complaints = [...mockComplaints];

export const getComplaints = (filters: ComplaintFilters) => {
  let filteredComplaints = [...complaints];

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredComplaints = filteredComplaints.filter(
      (complaint) =>
        complaint.id.toLowerCase().includes(searchLower) ||
        complaint.complainantName.toLowerCase().includes(searchLower) ||
        complaint.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply status filter
  if (filters.status && filters.status !== 'All') {
    filteredComplaints = filteredComplaints.filter(
      (complaint) => complaint.status === filters.status
    );
  }

  // Apply sorting
  filteredComplaints.sort((a, b) => {
    if (filters.sortBy === 'date') {
      return filters.sortOrder === 'asc'
        ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
    }

    if (filters.sortBy === 'status') {
      return filters.sortOrder === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }

    if (filters.sortBy === 'urgency') {
      const urgencyValue = { Low: 1, Medium: 2, High: 3 };
      return filters.sortOrder === 'asc'
        ? urgencyValue[a.urgency] - urgencyValue[b.urgency]
        : urgencyValue[b.urgency] - urgencyValue[a.urgency];
    }

    return 0;
  });

  return filteredComplaints;
};

export const getComplaintById = (id: string) => {
  return complaints.find((complaint) => complaint.id === id);
};

export const updateComplaint = (updatedComplaint: Complaint) => {
  complaints = complaints.map((complaint) =>
    complaint.id === updatedComplaint.id ? updatedComplaint : complaint
  );
  return updatedComplaint;
};

export const resolveComplaint = (id: string, comments: string) => {
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) return null;

  const updatedComplaint = {
    ...complaint,
    status: 'Resolved' as const,
    comments,
    resolutionDate: new Date().toISOString(),
  };

  return updateComplaint(updatedComplaint);
};

export const rejectComplaint = (id: string, rejectionReason: string) => {
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) return null;

  const updatedComplaint = {
    ...complaint,
    status: 'Rejected' as const,
    rejectionReason,
  };

  return updateComplaint(updatedComplaint);
};

export const getStatistics = async () => {
  try {
    const res = await getRequest(API_ENDPOINTS.GET_STATISTICS, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
    return {
      total: res.data.total,
      pending: res.data.pending,
      resolved: res.data.resolved,
      rejected: res.data.rejected,
      pendingPercentage: res.data.pendingPercentage,
      resolvedPercentage: res.data.resolvedPercentage,
      rejectedPercentage: res.data.rejectedPercentage,
    };
  } catch (error) {
    console.error(error);
  }
};