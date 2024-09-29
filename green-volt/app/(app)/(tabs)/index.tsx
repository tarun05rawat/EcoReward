import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HelpCircle, LifeBuoy, Settings, LogOut } from "react-native-feather";
import { useRouter } from "expo-router";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import DATA from "../../data"; // Assuming your user data is imported here

interface UserProfile {
  location: string;
  verified: boolean;
}

interface RecyclingEvent {
  id: string;
  date: string;
  location: string;
  recycledItems: { item: string; quantity: number }[];
  incentiveEarned: number;
}

interface UserData {
  uid: string;
  email: string;
  name: string;
  profile: UserProfile;
  recyclingEvents: RecyclingEvent[];
}

export default function ProfileScreen() {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // For loading state while fetching user data
  const router = useRouter();
  const auth = getAuth();

  // Function to handle logout
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

  // Function to get user data based on the currently signed-in user's UID
  const fetchUserData = (uid: string) => {
    // Filter the user data from DATA using the UID
    const userData = DATA.find((user) => user.uid === uid);
    if (userData) {
      setCurrentUserData(userData);
    } else {
      Alert.alert("Error", "User data not found.");
    }
    setLoading(false);
  };

  // Listen to authentication state and fetch the correct user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch the user data using the UID
        fetchUserData(user.uid);
      } else {
        // No user is signed in, redirect to sign-in page
        router.replace("/signin");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Loading state when fetching user data
  if (loading) {
    return <ActivityIndicator size="large" color="#4F7942" />;
  }

  // if (!currentUserData) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>User data not found.</Text>
  //     </View>
  //   );
  // }

  // Rendering recycled items
  const renderItem = ({ item }: { item: { item: string; quantity: number } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.item}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {currentUserData ? (
        <>
          <View style={styles.header}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{currentUserData.name}</Text>
            <Text style={styles.profileEmail}>{currentUserData.email}</Text>
          </View>

          {/* Display CITY, POINTS, and RANKING side by side */}
          <View style={styles.infoRow}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionHeader}>CITY</Text>
              <Text style={styles.sectionContent}>
                {currentUserData.profile.location}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionHeader}>POINTS</Text>
              <Text style={styles.sectionContent}>
                {currentUserData.recyclingEvents.reduce(
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
            {currentUserData.recyclingEvents.map((event) => (
              <View key={event.id} style={styles.eventContainer}>
                <Text style={styles.eventDate}>Date: {event.date}</Text>
                <Text style={styles.eventLocation}>
                  Location: {event.location}
                </Text>
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
        </>
      ) : (
        <ActivityIndicator size="large" color="#4F7942" />
      )}

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
