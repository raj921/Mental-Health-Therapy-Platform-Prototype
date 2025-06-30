import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native/types';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export function SafeAreaWrapper({ 
  children, 
  style, 
  backgroundColor = '#FFFFFF' 
}: SafeAreaWrapperProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});