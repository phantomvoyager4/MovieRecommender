import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type OptionRowProps = {
  title: string;
  onPress?: () => void;
};

const OptionRow = ({ title, onPress }: OptionRowProps) => (
    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center py-5 border-b border-brand-dark/10">
        <Text className="text-brand-dark font-medium text-base">{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#36312F" />
    </TouchableOpacity>
);

export default function AccountScreen() {
    const router = useRouter();
    const handleLogout = () => {
    router.replace('/'); 
  };
  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top']}>
        <ScrollView className="flex-1 px-4 pt-2">
            
            <View className="flex-row justify-between items-center mb-8">
                <Text className="text-brand-dark text-3xl font-bold">Account</Text>
                <Ionicons name="settings-outline" size={28} color="#36312F" />
            </View>

            <View className="bg-brand-red/10 rounded-3xl p-6 flex-row items-center gap-4 mb-8">
                <Image 
                    source={{ uri: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Iron-Man-icon.png' }} 
                    className="w-20 h-20 rounded-full bg-gray-300"
                />
                <View>
                    <Text className="text-brand-dark text-xl font-bold">Username</Text>
                    <Text className="text-brand-dark/60 text-sm mb-2">3 movies liked</Text>
                    <TouchableOpacity className="bg-brand-red px-4 py-2 rounded-full">
                        <Text className="text-white text-xs font-bold">Edit profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <OptionRow title="Your interests" />
                <OptionRow title="My reviews" />
                <OptionRow title="Friends" />
                <OptionRow title="Help & Support" />
                <OptionRow title="Settings" />
                <OptionRow title ="Log Out" onPress={handleLogout}/>
            </View>

        </ScrollView>
    </SafeAreaView>
  );
}