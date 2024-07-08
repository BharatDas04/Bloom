import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import NavigationScreen from "./src/NavigationScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./src/Functions/Colors";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        <NavigationScreen />
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
