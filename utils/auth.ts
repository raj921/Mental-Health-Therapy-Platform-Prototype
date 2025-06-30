import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Platform-aware storage adapter
class StorageAdapter {
  static async getItemAsync(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from localStorage:', error);
        return null;
      }
    } else {
      return await SecureStore.getItemAsync(key);
    }
  }

  static async setItemAsync(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
        throw error;
      }
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  static async deleteItemAsync(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
}

export class AuthService {
  private static instance: AuthService;
  private authListeners: Array<(user: User | null) => void> = [];
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Add auth state listener
  addAuthListener(callback: (user: User | null) => void) {
    this.authListeners.push(callback);
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners of auth state change
  private notifyAuthChange(user: User | null) {
    this.authListeners.forEach(listener => listener(user));
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      if (email === 'demo@therapy.com' && password === 'password123') {
        const user: User = {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-15',
          phone: '+1234567890',
          emergencyContact: {
            name: 'Jane Doe',
            phone: '+1234567891',
            relationship: 'Spouse'
          },
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        
        const token = 'mock_jwt_token_123';
        
        await this.storeCredentials(user, token);
        this.notifyAuthChange(user);
        return { user, token };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
  }): Promise<{ user: User; token: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };
      
      const token = 'mock_jwt_token_123';
      
      await this.storeCredentials(user, token);
      this.notifyAuthChange(user);
      return { user, token };
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      await StorageAdapter.deleteItemAsync(AUTH_TOKEN_KEY);
      await StorageAdapter.deleteItemAsync(USER_DATA_KEY);
      this.notifyAuthChange(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await StorageAdapter.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await StorageAdapter.getItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would trigger a password reset email
      console.log('Password reset email sent to:', email);
    } catch (error) {
      throw new Error('Failed to send password reset email.');
    }
  }

  private async storeCredentials(user: User, token: string): Promise<void> {
    try {
      await StorageAdapter.setItemAsync(AUTH_TOKEN_KEY, token);
      await StorageAdapter.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing credentials:', error);
      throw new Error('Failed to store credentials');
    }
  }
}

export const authService = AuthService.getInstance();