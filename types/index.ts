export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  lastLoginAt?: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  avatar?: string;
  bio: string;
  license: string;
  rating: number;
  reviewsCount: number;
}

export interface Appointment {
  id: string;
  therapistId: string;
  therapist: Therapist;
  userId: string;
  dateTime: string;
  duration: number; // in minutes
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  sessionNotes?: string;
  price: number;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'client' | 'therapist';
  content: string;
  type: 'text' | 'image' | 'document' | 'audio';
  encryptedContent?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  encryptedUrl?: string;
}

export interface Conversation {
  id: string;
  clientId: string;
  therapistId: string;
  therapist: Therapist;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SessionNote {
  id: string;
  appointmentId: string;
  therapistId: string;
  clientId: string;
  content: string;
  sharedWithClient: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  userId: string;
  title: string;
  description?: string;
  fileType: string;
  fileSize: number;
  url: string;
  encryptedUrl?: string;
  category: 'assessment' | 'treatment-plan' | 'insurance' | 'medical-history' | 'other';
  uploadedAt: string;
  sharedBy: 'client' | 'therapist';
  isSecure: boolean;
}

export interface AppointmentSlot {
  id: string;
  therapistId: string;
  dateTime: string;
  duration: number;
  isAvailable: boolean;
  price: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}