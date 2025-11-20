import { TextInput, StyleSheet } from "react-native";

export default function STInput(props: any) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
});
