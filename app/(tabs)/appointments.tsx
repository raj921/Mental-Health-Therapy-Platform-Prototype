import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { mockAppointments, mockAppointmentSlots, mockTherapists } from '@/utils/mockData';
import { Appointment, AppointmentSlot } from '@/types';
import { 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  Plus, 
  Filter,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native';

type ViewMode = 'calendar' | 'list';

export default function AppointmentsScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>(mockAppointmentSlots);
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} color="#2563EB" />;
      case 'phone':
        return <Phone size={16} color="#059669" />;
      case 'in-person':
        return <MapPin size={16} color="#7C3AED" />;
      default:
        return <Video size={16} color="#2563EB" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#2563EB';
      case 'completed':
        return '#059669';
      case 'cancelled':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const handleBookSlot = (slot: AppointmentSlot) => {
    Alert.alert(
      'Book Appointment',
      `Would you like to book this ${slot.duration} minute session for ${formatTime(slot.dateTime)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book', 
          onPress: () => {
            Alert.alert('Success', 'Appointment booked successfully!');
            setShowBookingModal(false);
          }
        },
      ]
    );
  };

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const pastAppointments = appointments
    .filter(apt => new Date(apt.dateTime) <= new Date())
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

  const markedDates = appointments.reduce((acc, appointment) => {
    const date = appointment.dateTime.split('T')[0];
    acc[date] = {
      marked: true,
      dotColor: getStatusColor(appointment.status),
      selectedColor: date === selectedDate ? '#2563EB' : undefined,
    };
    return acc;
  }, {} as any);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Appointments</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.viewToggle}
              onPress={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
            >
              <CalendarIcon size={20} color="#1F2937" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#1F2937" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowBookingModal(true)}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === 'calendar' ? (
          <ScrollView style={styles.content}>
            <Calendar
              current={selectedDate}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={markedDates}
              theme={{
                backgroundColor: '#FFFFFF',
                calendarBackground: '#FFFFFF',
                textSectionTitleColor: '#6B7280',
                selectedDayBackgroundColor: '#2563EB',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#2563EB',
                dayTextColor: '#1F2937',
                textDisabledColor: '#D1D5DB',
                arrowColor: '#2563EB',
                disabledArrowColor: '#D1D5DB',
                monthTextColor: '#1F2937',
                indicatorColor: '#2563EB',
                textDayFontWeight: '500',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '600',
              }}
            />
            
            {/* Selected Date Appointments */}
            <View style={styles.selectedDateSection}>
              <Text style={styles.sectionTitle}>
                {formatDate(selectedDate)}
              </Text>
              {appointments
                .filter(apt => apt.dateTime.split('T')[0] === selectedDate)
                .map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.appointmentHeader}>
                      <View style={styles.timeContainer}>
                        <Clock size={16} color="#6B7280" />
                        <Text style={styles.appointmentTime}>
                          {formatTime(appointment.dateTime)}
                        </Text>
                      </View>
                      <View style={styles.typeContainer}>
                        {getAppointmentIcon(appointment.type)}
                        <Text style={styles.appointmentType}>
                          {appointment.type}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.therapistName}>
                      {appointment.therapist.name}
                    </Text>
                    <Text style={styles.therapistTitle}>
                      {appointment.therapist.title}
                    </Text>
                    
                    <View style={styles.appointmentFooter}>
                      <Text style={[styles.status, { color: getStatusColor(appointment.status) }]}>
                        {appointment.status}
                      </Text>
                      <Text style={styles.duration}>
                        {appointment.duration} min
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={styles.content}>
            {/* Upcoming Appointments */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming ({upcomingAppointments.length})</Text>
              {upcomingAppointments.map((appointment) => (
                <View key={appointment.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.appointmentDate}>
                      {formatDate(appointment.dateTime)}
                    </Text>
                    <View style={styles.typeContainer}>
                      {getAppointmentIcon(appointment.type)}
                      <Text style={styles.appointmentType}>
                        {appointment.type}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentDetails}>
                    <Text style={styles.therapistName}>
                      {appointment.therapist.name}
                    </Text>
                    <Text style={styles.therapistTitle}>
                      {appointment.therapist.title}
                    </Text>
                  </View>
                  
                  <View style={styles.appointmentFooter}>
                    <Text style={styles.appointmentTime}>
                      {formatTime(appointment.dateTime)}
                    </Text>
                    <Text style={styles.duration}>
                      {appointment.duration} min
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Past Appointments */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Sessions ({pastAppointments.length})</Text>
              {pastAppointments.map((appointment) => (
                <View key={appointment.id} style={[styles.appointmentCard, styles.pastAppointment]}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.appointmentDate}>
                      {formatDate(appointment.dateTime)}
                    </Text>
                    <Text style={[styles.status, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status}
                    </Text>
                  </View>
                  
                  <Text style={styles.therapistName}>
                    {appointment.therapist.name}
                  </Text>
                  
                  <View style={styles.appointmentFooter}>
                    <Text style={styles.appointmentTime}>
                      {formatTime(appointment.dateTime)}
                    </Text>
                    <Text style={styles.duration}>
                      {appointment.duration} min
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Booking Modal */}
        <Modal
          visible={showBookingModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaWrapper>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Book Appointment</Text>
                <View style={{ width: 60 }} />
              </View>

              <ScrollView style={styles.modalContent}>
                <Text style={styles.sectionTitle}>Available Time Slots</Text>
                {availableSlots
                  .filter(slot => slot.isAvailable)
                  .map((slot) => (
                    <TouchableOpacity
                      key={slot.id}
                      style={styles.slotCard}
                      onPress={() => handleBookSlot(slot)}
                    >
                      <View style={styles.slotDetails}>
                        <Text style={styles.slotTime}>
                          {formatTime(slot.dateTime)}
                        </Text>
                        <Text style={styles.slotDate}>
                          {formatDate(slot.dateTime)}
                        </Text>
                        <Text style={styles.slotDuration}>
                          {slot.duration} minutes
                        </Text>
                      </View>
                      <View style={styles.slotPrice}>
                        <Text style={styles.priceText}>${slot.price}</Text>
                        <ChevronRight size={16} color="#6B7280" />
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </SafeAreaWrapper>
        </Modal>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewToggle: {
    padding: 8,
  },
  filterButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  selectedDateSection: {
    padding: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pastAppointment: {
    opacity: 0.7,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appointmentType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  appointmentDetails: {
    marginBottom: 8,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  therapistTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cancelButton: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  slotCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  slotDetails: {
    flex: 1,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  slotDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  slotDuration: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  slotPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
});