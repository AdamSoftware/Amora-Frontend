import { useState, useEffect } from "react";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { ActivityIndicator } from "react-native";

export default function FontLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // this should return a false if the fonts have not loaded yet
  if (!fontsLoaded) {
    setIsLoading(true);
    return <AppLoading />;
  }
  else if (isLoading) {
    setIsLoading(false);
    return <ActivityIndicator size="large" style={{ flex: 1 }} />
  }


  return isLoading;
}




