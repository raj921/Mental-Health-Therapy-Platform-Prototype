// Type definitions for expo modules
declare module 'expo';
declare module 'expo-*';
declare module '@expo/vector-icons';
declare module 'react-native';

// Global type declarations
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    EXPO_PUBLIC_API_URL?: string;
  }
}
