import { View, Text, StyleSheet } from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";


export default function EmptyList({ ListName, Name }: { ListName: any[]; Name: string }) {

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    
    ListName.length == 0 ? (
      <View style={styles.container}>
        <Text style={styles.TextContainer}>
          No {Name} Found. Add a new {Name} to get started!
        </Text>
      </View>
    ) : null  
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 150,
    justifyContent: "center",
    alignSelf: "center",
    width: 405,
  },
  TextContainer: {
   fontSize: 20,
   fontFamily: "Poppins_400Regular", 
   alignItems: "center", 
   justifyContent: "center", 
   textAlign: "center",
   padding: 5,
  }
});

