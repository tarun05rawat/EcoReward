import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { Award, Battery, Bell, HelpCircle, LogOut } from "react-native-feather";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";

const RECENT_ITEMS = [
  { id: "1", name: "AA Battery", date: "2023-09-25" },
  { id: "2", name: "Coca Cola Can", date: "2023-09-24" },
  { id: "3", name: "Harry Potter Book", date: "2023-09-23" },
  { id: "4", name: "Move-in Carton", date: "2023-09-22" },
  { id: "5", name: "Old Floppy Disk", date: "2023-09-21" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged Out", "You have been logged out successfully.", [
          { text: "OK", onPress: () => router.replace("/signin") },
        ]);
      })
      .catch((error) => {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      });
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; date: string };
  }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      {/* Display CITY, POINTS, and RANKING side by side */}
      <View style={styles.infoRow}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>CITY</Text>
          <Text style={styles.sectionContent}>New York City</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>POINTS</Text>
          <Text style={styles.sectionContent}>250 points</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>RANKING</Text>
          <Text style={styles.sectionContent}>#42 in your city</Text>
        </View>
      </View>

      <View style={styles.recentItemsContainer}>
        <Text style={styles.recentItemsTitle}>Recent Recycled Items</Text>
        <FlatList
          data={RECENT_ITEMS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.recentItemsList}
        />
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle
              stroke="#4F7942"
              width={24}
              height={24}
              style={styles.icon}
            />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Award
              stroke="#4F7942"
              width={24}
              height={24}
              style={styles.icon}
            />
            <Text style={styles.menuItemText}>Account Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut stroke="red" width={24} height={24} style={styles.icon} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 15,
    borderRadius: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4F7942",
  },
  profileName: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 5,
    color: "#333",
  },
  profileEmail: {
    fontSize: 15,
    color: "#777",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoSection: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F7942",
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: "#333",
  },
  recentItemsContainer: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  recentItemsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  recentItemsList: {
    maxHeight: 200,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
  itemDate: {
    fontSize: 14,
    color: "#777",
  },
  menuSection: {
    backgroundColor: "white",
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  icon: {
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
