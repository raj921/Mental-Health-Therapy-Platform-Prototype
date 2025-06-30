// Type definitions for @expo/vector-icons
declare module 'expo__vector-icons' {
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

  const _default: {
    MaterialIcons: typeof MaterialIcons;
    MaterialCommunityIcons: typeof MaterialCommunityIcons;
    Ionicons: typeof Ionicons;
    FontAwesome: typeof FontAwesome;
    Feather: typeof Feather;
    AntDesign: typeof AntDesign;
    Entypo: typeof Entypo;
    FontAwesome5: typeof FontAwesome5;
    Foundation: typeof Foundation;
    Octicons: typeof Octicons;
    SimpleLineIcons: typeof SimpleLineIcons;
    Zocial: typeof Zocial;
  };
  
  export default _default;
}
