export interface User {
  id: string;
  username: string;
  name: string;
  role: 'officer';
}

export interface Complaint {
  id: string;
  complainantName: string;
  submissionDate: string;
  description: string;
  status: 'Pending' | 'Resolved' | 'Rejected';
  contactInfo?: string;
  comments?: string;
  resolutionDate?: string;
  rejectionReason?: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export type ComplaintFilters = {
  search: string;
  status: string;
  sortBy: 'date' | 'status' | 'urgency';
  sortOrder: 'asc' | 'desc';
};