import { Therapist, Appointment, Conversation, Message, Document, AppointmentSlot } from '@/types';

export const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    title: 'Licensed Clinical Psychologist',
    specialization: ['Anxiety', 'Depression', 'Trauma', 'CBT'],
    bio: 'Dr. Wilson has over 10 years of experience in cognitive behavioral therapy and specializes in treating anxiety and depression.',
    license: 'PSY123456',
    rating: 4.9,
    reviewsCount: 127
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Licensed Marriage & Family Therapist',
    specialization: ['Couples Therapy', 'Family Therapy', 'Communication'],
    bio: 'Dr. Chen focuses on relationship dynamics and has helped hundreds of couples strengthen their bonds.',
    license: 'MFT789012',
    rating: 4.8,
    reviewsCount: 89
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    therapistId: '1',
    therapist: mockTherapists[0],
    userId: '1',
    dateTime: '2024-01-25T14:00:00Z',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    price: 150,
    meetingLink: 'https://therapy.com/session/abc123',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    therapistId: '1',
    therapist: mockTherapists[0],
    userId: '1',
    dateTime: '2024-01-18T14:00:00Z',
    duration: 60,
    type: 'video',
    status: 'completed',
    sessionNotes: 'Great progress this session. Client showed improved coping strategies.',
    price: 150,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    clientId: '1',
    therapistId: '1',
    therapist: mockTherapists[0],
    lastMessage: {
      id: '3',
      conversationId: '1',
      senderId: '1',
      senderType: 'therapist',
      content: 'How are you feeling about our upcoming session?',
      type: 'text',
      timestamp: '2024-01-22T16:30:00Z',
      status: 'delivered'
    },
    unreadCount: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-22T16:30:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '1',
    senderType: 'client',
    content: 'Hi Dr. Wilson, I wanted to follow up on our last session.',
    type: 'text',
    timestamp: '2024-01-22T15:00:00Z',
    status: 'read'
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    senderType: 'therapist',
    content: 'Hello! I\'m glad you reached out. How have you been feeling since our last session?',
    type: 'text',
    timestamp: '2024-01-22T15:30:00Z',
    status: 'read'
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '1',
    senderType: 'therapist',
    content: 'How are you feeling about our upcoming session?',
    type: 'text',
    timestamp: '2024-01-22T16:30:00Z',
    status: 'delivered'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    userId: '1',
    title: 'Initial Assessment',
    description: 'Your completed intake assessment form',
    fileType: 'pdf',
    fileSize: 245760,
    url: 'https://example.com/doc1.pdf',
    category: 'assessment',
    uploadedAt: '2024-01-15T10:00:00Z',
    sharedBy: 'therapist',
    isSecure: true
  },
  {
    id: '2',
    userId: '1',
    title: 'Treatment Plan',
    description: 'Your personalized treatment plan and goals',
    fileType: 'pdf',
    fileSize: 189440,
    url: 'https://example.com/doc2.pdf',
    category: 'treatment-plan',
    uploadedAt: '2024-01-20T14:00:00Z',
    sharedBy: 'therapist',
    isSecure: true
  }
];

export const mockAppointmentSlots: AppointmentSlot[] = [
  {
    id: '1',
    therapistId: '1',
    dateTime: '2024-01-26T09:00:00Z',
    duration: 60,
    isAvailable: true,
    price: 150
  },
  {
    id: '2',
    therapistId: '1',
    dateTime: '2024-01-26T10:00:00Z',
    duration: 60,
    isAvailable: true,
    price: 150
  },
  {
    id: '3',
    therapistId: '1',
    dateTime: '2024-01-26T14:00:00Z',
    duration: 60,
    isAvailable: false,
    price: 150
  }
];