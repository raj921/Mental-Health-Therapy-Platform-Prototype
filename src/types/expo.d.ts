// Type definitions for expo
declare module 'expo' {
  export * from 'expo';
  // Add any specific Expo module exports you need here
  export * from 'expo-constants';
  export * from 'expo-font';
  export * from 'expo-linking';
  export * from 'expo-router';
  export * from 'expo-splash-screen';
}

// Type definitions for @expo/vector-icons
declare module '@expo/vector-icons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export const MaterialIcons: ComponentType<IconProps>;
  export const MaterialCommunityIcons: ComponentType<IconProps>;
  export const Ionicons: ComponentType<IconProps>;
  export const FontAwesome: ComponentType<IconProps>;
  export const Feather: ComponentType<IconProps>;
  export const AntDesign: ComponentType<IconProps>;
  export const Entypo: ComponentType<IconProps>;
  export const FontAwesome5: ComponentType<IconProps>;
  export const Foundation: ComponentType<IconProps>;
  export const Octicons: ComponentType<IconProps>;
  export const SimpleLineIcons: ComponentType<IconProps>;
  export const Zocial: ComponentType<IconProps>;

  export default {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome,
    Feather,
    AntDesign,
    Entypo,
    FontAwesome5,
    Foundation,
    Octicons,
    SimpleLineIcons,
    Zocial,
  };
}
