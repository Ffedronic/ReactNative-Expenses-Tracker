import { Button, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message, onError }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Okay!" onPress={onError} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    margin: 6,
  },
});

export default ErrorOverlay;
