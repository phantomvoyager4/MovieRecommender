import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FBEAE7',
          borderTopColor: '#FD4148',
          height: 60,
          paddingBottom: 20,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FD4148',
        tabBarInactiveTintColor: '#36312F',
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="compass-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recommendation"
        options={{
          title: 'Recommendation',
          tabBarIcon: ({ color }) => <Ionicons name="star-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}