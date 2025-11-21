import { Stack } from 'expo-router';
import { LogBox } from 'react-native';
import "../global.css"; 

LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FBEAE7' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="movie/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}