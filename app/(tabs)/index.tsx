import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { authService } from '@/utils/auth';
import { mockAppointments, mockConversations } from '@/utils/mockData';
import { User, Appointment, Conversation } from '@/types';
import { 
  Calendar, 
  MessageCircle, 
  FileText, 
  Clock, 
  ChevronRight,
  Bell,
  Shield
} from 'lucide-react-native';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [recentMessages, setRecentMessages] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const userData = await authService.getStoredUser();
      setUser(userData);
      
      // Get next upcoming appointment
      const upcomingAppointments = mockAppointments.filter(
        apt => apt.status === 'scheduled' && new Date(apt.dateTime) > new Date()
      ).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      
      setNextAppointment(upcomingAppointments[0] || null);
      setRecentMessages(mockConversations);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user?.firstName || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1F2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/appointments')}
            >
              <Calendar size={24} color="#2563EB" />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/messages')}
            >
              <MessageCircle size={24} color="#059669" />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/documents')}
            >
              <FileText size={24} color="#7C3AED" />
              <Text style={styles.actionText}>Documents</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Shield size={24} color="#DC2626" />
              <Text style={styles.actionText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Appointment */}
        {nextAppointment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Session</Text>
            <TouchableOpacity 
              style={styles.appointmentCard}
              onPress={() => router.push(`/appointment/${nextAppointment.id}`)}
            >
              <View style={styles.appointmentHeader}>
                <View style={styles.therapistInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {nextAppointment.therapist.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.appointmentDetails}>
                    <Text style={styles.therapistName}>{nextAppointment.therapist.name}</Text>
                    <Text style={styles.therapistTitle}>{nextAppointment.therapist.title}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#6B7280" />
              </View>
              
              <View style={styles.appointmentTime}>
                <Clock size={16} color="#2563EB" />
                <Text style={styles.timeText}>{formatDate(nextAppointment.dateTime)}</Text>
              </View>
              
              <View style={styles.appointmentFooter}>
                <Text style={styles.sessionType}>{nextAppointment.type} session</Text>
                <Text style={styles.duration}>{nextAppointment.duration} minutes</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Messages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Messages</Text>
            <TouchableOpacity onPress={() => router.push('/messages')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentMessages.map((conversation) => (
            <TouchableOpacity 
              key={conversation.id}
              style={styles.messageCard}
              onPress={() => router.push(`/chat/${conversation.id}`)}
            >
              <View style={styles.messageHeader}>
                <View style={styles.therapistInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {conversation.therapist.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.messageDetails}>
                    <Text style={styles.therapistName}>{conversation.therapist.name}</Text>
                    <Text style={styles.lastMessage} numberOfLines={2}>
                      {conversation.lastMessage?.content}
                    </Text>
                  </View>
                </View>
                <View style={styles.messageTime}>
                  <Text style={styles.timeAgo}>2h ago</Text>
                  {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing for scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  appointmentCard: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  therapistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  appointmentDetails: {
    flex: 1,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  therapistTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 6,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionType: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  messageDetails: {
    flex: 1,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  messageTime: {
    alignItems: 'flex-end',
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});