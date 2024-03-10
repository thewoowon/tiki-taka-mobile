import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
          margin: 10,
          borderWidth: 2,
          padding: 10,
          backgroundColor: "yellow",
          borderRadius: 10,
        }}
      >
        안녕하세요!
      </Text>
      <StatusBar style="auto" />
      <Button title="hello" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
