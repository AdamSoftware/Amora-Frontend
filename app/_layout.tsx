import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Simulate loading time to see splash screen
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000); // Show splash screen for 3 seconds
  }, []);

  return <Stack 
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: '#FF6B6B' },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
  />;
}
