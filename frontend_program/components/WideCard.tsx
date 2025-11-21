import { View, Text, Image, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  tags: string;
  imageUri: string;
};

export const WideCard = ({ title, tags, imageUri }: Props) => {
  return (
    <TouchableOpacity className="flex-row w-full mb-4 bg-brand-bg rounded-3xl overflow-hidden">
      <Image 
        source={{ uri: imageUri }} 
        className="w-[100px] h-[140px] rounded-2xl"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center px-4 gap-2">
        <Text className="text-brand-dark text-lg font-bold">{title}</Text>
        <Text className="text-brand-dark/60 text-xs">{tags}</Text>
        <View className="bg-brand-red/10 self-start px-3 py-1 rounded-full mt-1">
             <Text className="text-brand-red text-xs font-bold">See details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};