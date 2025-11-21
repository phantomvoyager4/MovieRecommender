import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MOVIES_DB: Record<string, any> = {
  '1': {
    title: 'Avatar: The Way of Water',
    date: 'Dec 16, 2022',
    director: 'James Cameron',
    imageUri: 'https://image.tmdb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    tags: ['Action', 'Sci-Fi']
  },
  '2': {
    title: 'The Batman',
    date: 'Mar 04, 2022',
    director: 'Matt Reeves',
    imageUri: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    description: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    tags: ['Action', 'Crime']
  },
  '3': {
    title: 'Spider-Man: No Way Home',
    date: 'Dec 17, 2021',
    director: 'Jon Watts',
    imageUri: 'https://www.themoviedb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 
    description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous.',
    tags: ['Action', 'Fantasy']
  },
  '4': {
    title: 'Avatar: Fire and Ash',
    date: 'Dec 19, 2025',
    director: 'James Cameron',
    imageUri: 'https://www.themoviedb.org/t/p/w1280/g96wHxU7EnoIFwemb2RgohIXrgW.jpg', 
    description: 'The third installment in the Avatar franchise. Jake Sully and Neytiri encounter the Ash People, a clan of Na\'vi who are more aggressive and use fire as their element.',
    tags: ['Action', 'Fantasy']
  }
};

export default function MovieDetails() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  const movieId = Array.isArray(id) ? id[0] : id;
  const movie = MOVIES_DB[movieId || '2'] || MOVIES_DB['2'];

  return (
    <View className="flex-1 bg-black">
        <Image 
            source={{ uri: movie.imageUri }} 
            style={{ width: '100%', height: '60%' }}
            resizeMode="cover"
        />
        
        <View className="absolute top-12 left-4 z-50">
            <TouchableOpacity onPress={() => router.back()} className="bg-white/30 p-2 rounded-full">
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
        </View>

        <View className="flex-1 -mt-12 bg-brand-bg rounded-t-[32px] px-6 pt-8 pb-4 shadow-lg">
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View className="flex-row justify-between items-start mb-6">
                    <Text className="text-brand-dark text-2xl font-bold w-[75%] leading-8">
                        {movie.title}
                    </Text>
                    <TouchableOpacity className="bg-brand-pink/20 p-3 rounded-2xl">
                         <Ionicons name="bookmark-outline" size={24} color="#FD4148" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-3 mb-6 flex-wrap">
                    <View className="flex-row items-center bg-brand-pink/20 px-4 py-3 rounded-2xl gap-2">
                        <Ionicons name="calendar-outline" size={18} color="#FD4148" />
                        <Text className="text-brand-dark font-semibold">{movie.date}</Text>
                    </View>
                    <View className="flex-row items-center bg-brand-pink/20 px-4 py-3 rounded-2xl gap-2">
                        <Ionicons name="person-outline" size={18} color="#FD4148" />
                        <Text className="text-brand-dark font-semibold">{movie.director}</Text>
                    </View>
                </View>

                <TouchableOpacity className="mb-4">
                    <Text className="text-brand-red font-semibold text-sm">See reviews</Text>
                </TouchableOpacity>

                <Text className="text-brand-dark text-sm leading-6 font-normal mb-10 opacity-80">
                    {movie.description}
                </Text>

            </ScrollView>
        </View>
    </View>
  );
}