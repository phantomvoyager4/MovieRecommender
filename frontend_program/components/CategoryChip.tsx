import { Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  color?: string; 
};

export const CategoryChip = ({ label, color = 'bg-brand-red' }: Props) => {
  return (
    <TouchableOpacity className={`${color} rounded-full px-6 py-2 mr-2`}>
      <Text className="text-white font-medium text-sm">{label}</Text>
    </TouchableOpacity>
  );
};