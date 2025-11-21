import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  tags: string;
  date: string;
  imageUri: string;
  onPress?: () => void;
};

export const MovieCard = ({ title, tags, date, imageUri, onPress }: Props) => {
  return (
    <TouchableOpacity className="w-[160px] mr-4 bg-brand-red/10 rounded-3xl p-2" onPress={onPress}>
      <Image 
        source={{ uri: imageUri }} 
        className="w-full h-[200px] rounded-2xl mb-2"
        resizeMode="cover"
      />
      <View className="px-1 pb-2 items-center">
        <Text className="text-brand-dark font-bold text-sm text-center mb-1" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-brand-dark/60 text-[10px] text-center mb-2">
          {tags}
        </Text>
        <View className="flex-row items-center gap-1">
           <Ionicons name="calendar-outline" size={12} color="#FD4148" />
           <Text className="text-brand-dark font-bold text-[10px]">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};