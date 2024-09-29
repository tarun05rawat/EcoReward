import React, { useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, TextInput, View, Text, Image, StyleSheet } from "react-native";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  async function handleSignUp() {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save the user's additional data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        city: city,
        email: email,
        points: 250, // default points
        ranking: "#42", // example ranking
      });

      router.replace("/(app)/(tabs)/");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./(components)/green-volt-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.signupBox}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
          />
          <Button
            title={loading ? "Signing Up..." : "Sign Up"}
            onPress={handleSignUp}
            disabled={loading}
            color="black"
          />
          <Text style={styles.linkText}>Already have an account?</Text>
          <Button
            title="Sign In"
            onPress={() => router.replace("/signin")}
            color="#1E90FF"
          />
        </View>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#a1bb76",
    padding: 24,
    paddingTop: 40,
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 350,
    marginTop: -30,
    backgroundColor: 'transparent',
  },
  signupBox: {
    margin: 60,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: -20,
  },
  inputContainer: {
    width: 300,
    // gap: 9,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    color: "#999",
    textAlign: "center",
  },
});
