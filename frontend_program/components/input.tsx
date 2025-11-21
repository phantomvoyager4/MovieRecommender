import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

type Props = {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
};

export const Input = ({ placeholder, icon, isPassword = false }: Props) => {
  return (
    <View className="w-full flex-row items-center border border-brand-dark rounded-3xl px-4 py-3 mb-4 bg-transparent">
      <Ionicons name={icon} size={20} color="#36312F" />
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor="#36312F"
        secureTextEntry={isPassword}
        className="flex-1 ml-3 text-brand-dark font-medium"
      />
      {isPassword && <Ionicons name="eye-off-outline" size={20} color="#36312F" />}
    </View>
  );
};