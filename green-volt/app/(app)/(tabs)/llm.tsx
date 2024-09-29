import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function AskMePage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Make an actual API call to your Breadboard server
      const response = await fetch("http://localhost:5000/query", {
        // Replace with your actual backend URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: query }), // Send the query to the server
      });

      const data = await response.json();
      setAnswer(data.output); // Set the answer from the API response
    } catch (error) {
      setAnswer("Sorry, an error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient colors={["#E9D5FF", "#FCE7F3"]} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.card}>
              <Text style={styles.heading}>Ask Me</Text>
              <TextInput
                style={styles.input}
                placeholder="Type your question here..."
                value={query}
                onChangeText={setQuery}
                multiline
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Thinking..." : "Ask"}
                </Text>
              </TouchableOpacity>
              {answer !== "" && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerHeading}>Answer:</Text>
                  <Text style={styles.answerText}>{answer}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6B46C1",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6B46C1",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  answerContainer: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 5,
  },
  answerHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B46C1",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    color: "#4B5563",
  },
});
