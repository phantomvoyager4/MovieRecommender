import { View, Text, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CategoryChip } from '../../components/CategoryChip';
import { MovieCard } from '../../components/MovieCard';
import { useRouter } from 'expo-router';


export default function ExploreScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top']}>
      <ScrollView className="flex-1 px-4 pt-2" showsVerticalScrollIndicator={false}>
        
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-brand-dark text-3xl font-bold">Explore</Text>
          <Ionicons name="notifications-outline" size={28} color="#36312F" />
        </View>

        <View className="flex-row items-center border border-brand-dark/20 bg-white/50 rounded-3xl px-4 py-3 mb-6">
          <Ionicons name="search" size={20} color="#36312F" />
          <TextInput 
            placeholder="Search" 
            placeholderTextColor="#999"
            className="flex-1 ml-3 text-brand-dark"
          />
          <View className="bg-brand-red p-2 rounded-full">
            <Ionicons name="options" size={16} color="white" />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          <CategoryChip label="Action" color="bg-brand-red"/>
          <CategoryChip label="Horror" color="bg-brand-green" />
          <CategoryChip label="Drama" color="bg-brand-pink" />
          <CategoryChip label="Sci-fi" color="bg-brand-purple" />
        </ScrollView>

        <Text className="text-brand-dark text-2xl font-bold mb-4">Recommended</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          <MovieCard 
            title="Avatar: The Way of Water"
            tags="Action, Sci-Fi"
            date="Dec 19, 2025"
            imageUri="https://www.themoviedb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
            onPress={() => router.push('/movie/1')}
          />
          <MovieCard 
            title="Batman"
            tags="Action, Crime"
            date="Jun 01, 2026"
            imageUri="https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
            onPress={() => router.push('/movie/2')}
          />
        </ScrollView>

        <Text className="text-brand-dark text-2xl font-bold mb-4">Upcoming movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-20">
             <MovieCard 
            title="Spider-Man"
            tags="Action, Fantasy"
            date="Jun 21, 2002"
            imageUri="https://www.themoviedb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"
            onPress={() => router.push('/movie/3')}
          />
          <MovieCard 
            title="Avatar: Fire and Ash"
            tags="Action, Fantasy"
            date="Dec 19, 2025"
            imageUri="https://www.themoviedb.org/t/p/w1280/g96wHxU7EnoIFwemb2RgohIXrgW.jpg"
            onPress={() => router.push('/movie/4')}
          />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}