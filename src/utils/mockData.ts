import { Complaint, User } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: '1',
    username: 'officer1',
    name: 'Officer Johnson',
    role: 'officer',
  },
  {
    id: '2',
    username: 'officer2',
    name: 'Officer Williams',
    role: 'officer',
  },
];

// Mock complaints data
export const complaints: Complaint[] = [
  {
    id: 'C001',
    complainantName: 'Sarah Miller',
    submissionDate: '2025-03-15T10:30:00Z',
    description: 'I have been receiving threatening messages on my phone for the past week.',
    status: 'Pending',
    contactInfo: 'sarah.m@example.com | +1-555-123-4567',
    urgency: 'High',
  },
  {
    id: 'C002',
    complainantName: 'Emily Johnson',
    submissionDate: '2025-03-14T14:45:00Z',
    description: 'Someone has been following me on my way home from college.',
    status: 'Resolved',
    contactInfo: 'emily.j@example.com | +1-555-234-5678',
    comments: 'Suspect identified and warning issued.',
    resolutionDate: '2025-03-16T09:20:00Z',
    urgency: 'High',
  },
  {
    id: 'C003',
    complainantName: 'Jessica Thompson',
    submissionDate: '2025-03-12T08:15:00Z',
    description: 'I noticed a suspicious person taking photos of girls outside our school.',
    status: 'Pending',
    contactInfo: 'jessica.t@example.com | +1-555-345-6789',
    urgency: 'Medium',
  },
  {
    id: 'C004',
    complainantName: 'Laura Garcia',
    submissionDate: '2025-03-10T16:20:00Z',
    description: 'I received inappropriate messages on social media from an unknown person.',
    status: 'Rejected',
    contactInfo: 'laura.g@example.com | +1-555-456-7890',
    rejectionReason: 'Insufficient evidence to proceed. Advised to block the sender and report to the platform.',
    urgency: 'Low',
  },
  {
    id: 'C005',
    complainantName: 'Michelle Lee',
    submissionDate: '2025-03-08T11:10:00Z',
    description: 'A group of men were harassing women at Central Park yesterday evening.',
    status: 'Resolved',
    contactInfo: 'michelle.l@example.com | +1-555-567-8901',
    comments: 'Increased patrol in the area. Suspects identified from CCTV footage.',
    resolutionDate: '2025-03-09T14:30:00Z',
    urgency: 'Medium',
  },
  {
    id: 'C006',
    complainantName: 'Rachel Wilson',
    submissionDate: '2025-03-06T09:45:00Z',
    description: 'My ex-boyfriend is continuously calling and threatening me despite the restraining order.',
    status: 'Pending',
    contactInfo: 'rachel.w@example.com | +1-555-678-9012',
    urgency: 'High',
  },
  {
    id: 'C007',
    complainantName: 'Sophia Martinez',
    submissionDate: '2025-03-04T13:25:00Z',
    description: 'I was verbally harassed by a group of men while waiting at the bus stop.',
    status: 'Resolved',
    contactInfo: 'sophia.m@example.com | +1-555-789-0123',
    comments: 'Suspects identified from bus station CCTV. Case filed.',
    resolutionDate: '2025-03-05T10:15:00Z',
    urgency: 'Medium',
  },
  {
    id: 'C008',
    complainantName: 'Taylor Brown',
    submissionDate: '2025-03-02T15:50:00Z',
    description: 'I believe someone hacked my social media accounts and is posting private information.',
    status: 'Pending',
    contactInfo: 'taylor.b@example.com | +1-555-890-1234',
    urgency: 'Medium',
  },
];