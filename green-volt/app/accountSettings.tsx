import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Settings, ArrowLeft } from "react-native-feather";
import { useRouter } from "expo-router";

export default function AccountSettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft stroke="#4F7942" width={28} height={28} />
        </TouchableOpacity>
        <Settings stroke="#4F7942" width={50} height={50} />
        <Text style={styles.headerText}>Account Settings</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionText}>Manage your account settings below:</Text>
        {/* <TouchableOpacity style={styles.button} onPress={() => router.push("/changepassword")}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/updateemail")}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/notifications")}> */}
          {/* <Text style={styles.buttonText}>Notification Preferences</Text>
        </TouchableOpacity> */}
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
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
