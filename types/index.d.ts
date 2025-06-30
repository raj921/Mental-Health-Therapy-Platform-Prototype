// Type definitions for the application

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'therapist' | 'admin';
  dateOfBirth?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  createdAt: string;
  updatedAt: string;
};

type Therapist = User & {
  credentials: string[];
  experienceYears: number;
  hourlyRate: number;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  rating?: number;
  reviews?: Review[];
};

type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Appointment = {
  id: string;
  therapistId: string;
  patientId: string;
  dateTime: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: string;
};

type Conversation = {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
};

type Document = {
  id: string;
  userId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
};

type AppointmentSlot = {
  id: string;
  therapistId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
};

export {
  User,
  Therapist,
  Review,
  Appointment,
  Message,
  Conversation,
  Document,
  AppointmentSlot
};
