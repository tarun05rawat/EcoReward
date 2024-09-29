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
import { HelpCircle, LifeBuoy, Settings, LogOut } from "react-native-feather";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import DATA from "../../data"; // Make sure to import your data correctly

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

  interface Item {
    item: string;
    quantity: number;
  }

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.item}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{DATA[0].name}</Text>
        <Text style={styles.profileEmail}>{DATA[0].email}</Text>
      </View>

      {/* Display CITY, POINTS, and RANKING side by side */}
      <View style={styles.infoRow}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>CITY</Text>
          <Text style={styles.sectionContent}>{DATA[0].profile.location}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>POINTS</Text>
          <Text style={styles.sectionContent}>
            {DATA[0].recyclingEvents.reduce(
              (acc, event) => acc + event.incentiveEarned,
              0
            )}{" "}
            points
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>RANKING</Text>
          <Text style={styles.sectionContent}>#42 in your city</Text>
        </View>
      </View>

      <View style={styles.recentItemsContainer}>
        <Text style={styles.recentItemsTitle}>Recent Recycled Items</Text>
        {DATA[0].recyclingEvents.map((event) => (
          <View key={event.id} style={styles.eventContainer}>
            <Text style={styles.eventDate}>Date: {event.date}</Text>
            <Text style={styles.eventLocation}>Location: {event.location}</Text>
            <FlatList
              data={event.recycledItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.item}
            />
            <Text style={styles.incentiveEarned}>
              Incentive Earned: ${event.incentiveEarned}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Support</Text>

        {/* Info Page */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/info")}
        >
          <View style={styles.menuItemLeft}>
            <HelpCircle
              stroke="#4F7942"
              width={24}
              height={24}
              style={styles.icon}
            />
            <Text style={styles.menuItemText}>Info</Text>
          </View>
        </TouchableOpacity>

        {/* Help Center Page */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/help")}
        >
          <View style={styles.menuItemLeft}>
            <LifeBuoy
              stroke="#4F7942"
              width={24}
              height={24}
              style={styles.icon}
            />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
        </TouchableOpacity>

        {/* Account Settings Page */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/accountSettings")}
        >
          <View style={styles.menuItemLeft}>
            <Settings
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
  eventContainer: {
    marginBottom: 15,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: "600",
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
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
  itemQuantity: {
    fontSize: 14,
    color: "#777",
  },
  incentiveEarned: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F7942",
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