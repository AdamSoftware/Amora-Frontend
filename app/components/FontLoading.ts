import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

// INFO: this will load all the fonts in one area so that I can add them as I go 
function FontLoading() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // WARNING: this will return true || false depending on weather the fonts loaded or not
  return !fontsLoaded; 
}

export default FontLoading;

