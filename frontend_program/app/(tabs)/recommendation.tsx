import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const API_URL = 'http://192.168.1.82:8000/recommend'; 

export default function RecommendationScreen() {
  const [addedMovies, setAddedMovies] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleAddMovie = () => {
    const trimmedText = inputText.trim();

    if (!trimmedText) return; 
    if (addedMovies.length >= 5) {
      setError('Max 5 movies allowed!');
      return;
    }
    
    setAddedMovies([...addedMovies, trimmedText]);
    setInputText('');
    setError('');
  };

  const handleRemoveMovie = (indexToRemove: number) => {
    setAddedMovies(addedMovies.filter((_, index) => index !== indexToRemove));
    if (addedMovies.length - 1 < 2) setError(''); 
  };


  const getRecommendations = async () => {
    Keyboard.dismiss();
    if (addedMovies.length < 2) {
      setError('Please add at least 2 movies!');
      return;
    }

    setLoading(true);
    setRecommendations([]);
    setError('');
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movies: addedMovies }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAddedMovies([]);
        setRecommendations(data.data);
      } else {
        Alert.alert("No results", "Could not find recommendations based on these titles.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Network Error", "Check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top']}>
      <ScrollView className="flex-1 px-6 pt-4" keyboardShouldPersistTaps="handled">
        
        <View className="items-center mb-8 mt-2">
          <Text className="text-brand-dark text-3xl font-bold">
            Movie Recommender
          </Text>
        </View>

        <Text className="text-brand-dark text-lg mb-4">
          Add movies you like (2-5):
        </Text>

        <View className="mb-6">
          <View className="flex-row items-center gap-2">
            <TextInput
              value={inputText}
              onChangeText={(text) => {
                  setInputText(text);
                  if(error) setError('');
              }}
              placeholder={addedMovies.length >= 5 ? "Limit reached" : "Type movie title..."}
              placeholderTextColor="#999"
              editable={addedMovies.length < 5}
              onSubmitEditing={handleAddMovie}
              className="flex-1 p-4 border-2 border-brand-dark rounded-3xl text-brand-dark text-base text-lg bg-white/50"
            />
            
            <TouchableOpacity 
                onPress={handleAddMovie}
                disabled={addedMovies.length >= 5}
                className={`p-4 rounded-full ${addedMovies.length >= 5 ? 'bg-gray-300' : 'bg-brand-dark'}`}
            >
                <Ionicons name="add" size={24} color="#FBEAE7" />
            </TouchableOpacity>
          </View>
          
          {error ? (
            <Text className="text-brand-red text-sm mt-2 font-bold ml-2">{error}</Text>
          ) : null}
        </View>

        <View className="flex-row flex-wrap gap-2 mb-8 min-h-[50px]">
            {addedMovies.map((movie, index) => (
                <View key={index} className="flex-row items-center bg-brand-red/20 px-4 py-2 rounded-full border border-brand-red">
                    <Text className="text-brand-dark font-semibold mr-2">{movie}</Text>
                    <TouchableOpacity onPress={() => handleRemoveMovie(index)}>
                        <Ionicons name="close-circle" size={20} color="#FD4148" />
                    </TouchableOpacity>
                </View>
            ))}
            {addedMovies.length === 0 && (
                <Text className="text-brand-dark/40 text-sm italic w-full text-center mt-2">
                    No movies added yet.
                </Text>
            )}
        </View>

        <TouchableOpacity 
            onPress={getRecommendations}
            disabled={loading}
            className={`w-full py-4 rounded-3xl items-center mb-8 ${loading ? 'bg-gray-400' : 'bg-brand-dark'}`}
        >
            {loading ? (
                <ActivityIndicator color="#FBEAE7" />
            ) : (
                <Text className="text-brand-bg font-bold text-lg">Get Recommendations</Text>
            )}
        </TouchableOpacity>

        {recommendations.length > 0 && (
          <View className="mb-20">
            <Text className="text-brand-dark text-2xl font-bold mb-4 border-b border-brand-dark/10 pb-2">
              Recommended for you:
            </Text>
            
            {recommendations.map((rec, index) => (
              <View key={index} className="flex-row w-full mb-4 bg-white/60 rounded-3xl overflow-hidden p-3 shadow-sm">
                 <Image 
                    source={{ uri: 'https://placehold.co/100x140/png' }}
                    className="w-[80px] h-[110px] rounded-2xl bg-gray-300"
                    resizeMode="cover"
                 />
                 <View className="flex-1 justify-center px-4">
                    <Text className="text-brand-dark text-lg font-bold mb-1">{rec.title}</Text>
                    {rec.release_date && (
                        <View className="flex-row items-center gap-1 mb-2">
                            <Ionicons name="calendar-outline" size={14} color="#FD4148" />
                            <Text className="text-gray-600 text-xs">{rec.release_date}</Text>
                        </View>
                    )}
                    <Text className="text-brand-dark/70 text-xs" numberOfLines={2}>
                        {rec.overview}
                    </Text>
                 </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}


