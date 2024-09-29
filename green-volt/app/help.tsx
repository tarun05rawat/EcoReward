import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { HelpCircle, ArrowLeft } from "react-native-feather";

export default function HelpScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft stroke="#4F7942" width={28} height={28} />
        </TouchableOpacity>
        <HelpCircle stroke="#4F7942" width={50} height={50} />
        <Text style={styles.headerText}>Help Center</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionText}>
          Welcome to the Help Center! Here you can find FAQs, tutorials, and support articles to assist you with your recycling and sustainability journey.
        </Text>
        {/* <TouchableOpacity style={styles.button} onPress={() => router.push("/faq")}> */}
          <Text style={styles.buttonText}>Go to FAQs</Text>
        {/* </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 25,
    marginBottom: 15,
    borderRadius: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4F7942",
    marginTop: 10,
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4F7942",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
