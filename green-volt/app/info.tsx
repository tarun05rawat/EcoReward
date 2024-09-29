import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define types for creator and app info
type Creator = {
  name: string;
  role: string;
  linkedin: string;
}

type AppInfo = {
  name: string;
  version: string;
  description: string;
  creators: Creator[];
  goals: string[];
}

export default function InfoScreen() {
  const router = useRouter();

  const appInfo: AppInfo = {
    name: "EcoReward",
    version: "1.0.0",
    description: "EcoReward is a product recycling platform designed to incentivize sustainable practices by automatically rewarding users when they return batteries to authorized recycling centers. Our app uses advanced tracking and machine learning to manage the recycling process efficiently.",
    creators: [
      { name: "Siddhesh Kulkarni", role: "Developer", linkedin: "https://www.linkedin.com/in/siddhesh-kulkarni05/" },
      { name: "Tarun Rawat", role: "Developer", linkedin: "https://www.linkedin.com/in/tarun05rawat/" },
      { name: "Tanmay Dabhade", role: "Developer", linkedin: "https://www.linkedin.com/in/tanmay-dabhade/" },
    ],
    goals: [
      "Promote sustainable recycling practices",
      "Reduce environmental impact of battery waste",
      "Create a transparent and efficient reward system",
      "Educate users about proper battery disposal",
      "Partner with eco-friendly brands to offer valuable incentives",
    ],
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>About EcoReward</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={{ uri: '' }}  // Replace with actual image URL
          style={styles.logo}
        />
        <Text style={styles.appName}>{appInfo.name}</Text>
        <Text style={styles.version}>Version {appInfo.version}</Text>
        
        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.description}>{appInfo.description}</Text>
        
        <Text style={styles.sectionTitle}>Our Goals</Text>
        {appInfo.goals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}
        
        <Text style={styles.sectionTitle}>Meet the Team</Text>
        {appInfo.creators.map((creator, index) => (
          <View key={index} style={styles.creatorItem}>
            <Ionicons name="person-outline" size={24} color="#4CAF50" style={styles.creatorIcon} />
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorName}>{creator.name}</Text>
              <Text style={styles.creatorRole}>{creator.role}</Text>
            </View>
            <Ionicons
              name="logo-linkedin"
              size={24}
              color="#0077B5"
              onPress={() => handleLinkPress(creator.linkedin)}
            />
          </View>
        ))}
        
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepItem}>
          <Ionicons name="battery-charging-outline" size={24} color="#4CAF50" />
          <Text style={styles.stepText}>Register your batteries in the app</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="location-outline" size={24} color="#4CAF50" />
          <Text style={styles.stepText}>Find nearby authorized recycling centers</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="refresh-outline" size={24} color="#4CAF50" />
          <Text style={styles.stepText}>Return batteries for recycling</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="gift-outline" size={24} color="#4CAF50" />
          <Text style={styles.stepText}>Earn rewards for your eco-friendly actions</Text>
        </View>
        
        <Text style={styles.footer}>
          © 2023 EcoReward. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,  // Adjusted padding to remove extra space
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  creatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creatorIcon: {
    marginRight: 15,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  creatorRole: {
    fontSize: 14,
    color: '#666',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});
