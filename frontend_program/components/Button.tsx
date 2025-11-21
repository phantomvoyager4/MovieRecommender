import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'filled' | 'outline';
};

export const Button = ({ title, onPress, variant = 'filled' }: Props) => {
  const base = "w-full py-4 rounded-3xl items-center justify-center";
  const styles = variant === 'filled' 
    ? "bg-brand-red border border-brand-red" 
    : "bg-transparent border border-brand-red";
  
  const textStyles = variant === 'filled' ? "text-brand-beige" : "text-brand-red";

  return (
    <TouchableOpacity onPress={onPress} className={`${base} ${styles}`}>
      <Text className={`${textStyles} font-bold text-base`}>{title}</Text>
    </TouchableOpacity>
  );
};