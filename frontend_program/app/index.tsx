import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/logo.png';

export default function LandingPage() {
  const router = useRouter();
  const enterApp = () => {
  router.replace('/(tabs)/explore'); 
};

  return (
    <SafeAreaView className="flex-1 bg-brand-bg items-center justify-center px-6">
      <Text className="text-brand-dark text-3xl font-bold mb-10 text-center">
        MOVIE RECOMMENDER
      </Text>
      
      <Text className="text-brand-dark text-3xl font-bold mb-10 text-center">
        Lets get started!
      </Text>
      <Image 
        source={Logo} 
        className="w-72 h-72 mb-16"
        resizeMode="contain"
      />

      <View className="w-full gap-4">
        <TouchableOpacity 
          onPress={enterApp}
          className="bg-brand-red w-full py-4 rounded-3xl items-center justify-center"
        >
          <Text className="text-brand-bg font-bold text-base">LOG IN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={enterApp}
          className="bg-transparent border border-brand-red w-full py-4 rounded-3xl items-center justify-center"
        >
          <Text className="text-brand-red font-bold text-base">SIGN UP</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}