import React, { useState } from "react";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, View, Text, Image, StyleSheet } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  async function handleSignIn() {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
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
      <Text style={styles.sign_title}>Sign In</Text>
      <View style={styles.signInBox}>
        <Text style={styles.header}>Sign In</Text>
        <View style={styles.inputContainer}>
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
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
            color="#876464"
          />
          <Text style={styles.linkText}>Don't have an account?</Text>
          <Button
            title="Sign Up"
            onPress={() => router.replace("/signup")}
            color="black"
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
  sign_title: {
    fontSize: 32,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: -20,
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 250,
    marginTop: -30,
    backgroundColor: 'transparent',
  },
  signInBox: {
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
    marginTop: -1,
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
