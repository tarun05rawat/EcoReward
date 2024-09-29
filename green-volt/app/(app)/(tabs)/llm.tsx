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
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY =
  "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";

export default function AskMePage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callOpenAIAPI = async (input: string) => {
    try {
      const body = {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are Jack, a sustainability expert who excels in analyzing data, developing strategies, and implementing solutions for renewable energy, waste management, and sustainable product development. You focus on balancing environmental, social, and economic factors, always aiming for long-term sustainability while addressing immediate needs. Your approach is structured: you gather data, analyze risks and opportunities, and create scalable, viable solutions aligned with sustainability goals. Throughout, you remain committed to reducing environmental impact and promoting resource efficiency.`,
          },
          { role: "user", content: input },
        ],
        max_tokens: 60,
      };

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Please enter a question");
      return;
    }

    setIsLoading(true);

    try {
      const result = await callOpenAIAPI(query);
      setAnswer(result);
    } catch (error) {
      setAnswer("Sorry, an error occurred while processing your request.");
      Alert.alert(
        "Error",
        "Failed to get a response from the AI. Please try again."
      );
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
                accessible={true}
                accessibilityLabel="Input field for your question"
                accessibilityHint="Enter your question here and press Ask to get an answer"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isLoading}
                accessible={true}
                accessibilityLabel="Ask button"
                accessibilityHint="Press to submit your question"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Ask</Text>
                )}
              </TouchableOpacity>
              {answer !== "" && (
                <ScrollView style={styles.answerContainer}>
                  <Text style={styles.answerHeading}>Answer:</Text>
                  <Text style={styles.answerText}>{answer}</Text>
                </ScrollView>
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
    flexWrap: "wrap",
  },
});
