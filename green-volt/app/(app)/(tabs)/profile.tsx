import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { User, ChevronRight, Award, Battery, Bell, HelpCircle, LogOut } from 'react-native-feather';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Batteries</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>250</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Recycled</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Award stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.menuItemText}>Rewards</Text>
          </View>
          <ChevronRight stroke="#999" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Battery stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.menuItemText}>My Batteries</Text>
          </View>
          <ChevronRight stroke="#999" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <ChevronRight stroke="#999" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Battery Details</Text>
        <View style={styles.detailsCard}>
          <Text style={styles.subtitle}>AA-123456</Text>
          <Text style={styles.detailText}>Type: AA</Text>
          <Text style={styles.detailText}>Health: 85%</Text>
          <Text style={styles.detailText}>Est. Lifecycle: 3 months</Text>
          <Text style={styles.detailText}>Last Check: 2 days ago</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recycle Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>View Usage History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <HelpCircle stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
          <ChevronRight stroke="#999" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <User stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.menuItemText}>Account Settings</Text>
          </View>
          <ChevronRight stroke="#999" width={24} height={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut stroke="red" width={24} height={24} style={styles.icon} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  outlineButton: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  outlineButtonText: {
    color: 'green',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailText: {
    marginBottom: 4,
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});