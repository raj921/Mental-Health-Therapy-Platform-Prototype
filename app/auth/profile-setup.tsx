import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { User, Plus, X } from 'lucide-react-native';

export default function ProfileSetupScreen() {
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate saving profile setup
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete profile setup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  if (isLoading) {
    return <LoadingSpinner text="Setting up your profile..." />;
  }

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <User size={60} color="#2563EB" />
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us provide you with the best care by completing your profile information.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <Text style={styles.sectionSubtitle}>
              Optional: Add someone we can contact in case of emergency
            </Text>
          </View>

          {!showEmergencyContact ? (
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => setShowEmergencyContact(true)}
            >
              <Plus size={20} color="#2563EB" />
              <Text style={styles.addButtonText}>Add Emergency Contact</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.emergencyContactForm}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Emergency Contact Information</Text>
                <TouchableOpacity onPress={() => setShowEmergencyContact(false)}>
                  <X size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={emergencyContact.name}
                  onChangeText={(text: string) =>
                    setEmergencyContact((prev: typeof emergencyContact) => ({ ...prev, name: text }))
                  }
                  placeholder="Enter contact's full name"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={emergencyContact.phone}
                  onChangeText={(text: string) =>
                    setEmergencyContact((prev: typeof emergencyContact) => ({ ...prev, phone: text }))
                  }
                  placeholder="+1 (555) 123-4567"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Relationship</Text>
                <TextInput
                  style={styles.input}
                  value={emergencyContact.relationship}
                  onChangeText={(text: string) =>
                    setEmergencyContact((prev: typeof emergencyContact) => ({ ...prev, relationship: text }))
                  }
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Your Privacy Matters</Text>
          <Text style={styles.infoText}>
            • All your information is encrypted and HIPAA compliant{'\n'}
            • Only you and your assigned therapist can access your data{'\n'}
            • You can update or remove information at any time{'\n'}
            • We never share your data with third parties
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Complete Setup</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  emergencyContactForm: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#3730A3',
    lineHeight: 20,
  },
  buttons: {
    gap: 12,
  },
  completeButton: {
    height: 48,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});