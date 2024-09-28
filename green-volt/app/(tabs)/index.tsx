import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Battery, MapPin, Plus } from 'react-native-feather';

export default function AppScreens() {
  return (
    <ScrollView style={styles.container}>
      {/* Battery Options */}
      <View style={styles.card}>
        <Text style={styles.title}>Your Batteries</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.subtitle}>Registered Batteries</Text>
          <TouchableOpacity>
            <Plus stroke="green" width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.batteryItem}>
          <View style={styles.row}>
            <Battery stroke="green" width={24} height={24} style={styles.icon} />
            <Text style={styles.batteryText}>AA-123456</Text>
          </View>
          <Text style={styles.batteryHealth}>Health: 85%</Text>
        </View>
        <View style={styles.batteryItem}>
          <View style={styles.row}>
            <Battery stroke="orange" width={24} height={24} style={styles.icon} />
            <Text style={styles.batteryText}>AAA-789012</Text>
          </View>
          <Text style={styles.batteryHealth}>Health: 62%</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Battery</Text>
        </TouchableOpacity>
      </View>

      {/* Battery Details */}
      

      {/* Nearby Recycling Centers */}
      <View style={styles.card}>
        <Text style={styles.title}>Nearby Recycling Centers</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map View</Text>
        </View>
        <View style={styles.recycleCenter}>
          <View>
            <Text style={styles.recycleCenterName}>EcoRecycle Center</Text>
            <Text style={styles.recycleCenterDistance}>0.5 miles away</Text>
          </View>
          <MapPin stroke="green" width={24} height={24} />
        </View>
        <View style={styles.recycleCenter}>
          <View>
            <Text style={styles.recycleCenterName}>GreenTech Recycling</Text>
            <Text style={styles.recycleCenterDistance}>1.2 miles away</Text>
          </View>
          <MapPin stroke="green" width={24} height={24} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Find More Centers</Text>
        </TouchableOpacity>
      </View>
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batteryText: {
    fontWeight: '500',
  },
  batteryHealth: {
    color: '#666',
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapPlaceholderText: {
    color: '#666',
  },
  recycleCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  recycleCenterName: {
    fontWeight: '500',
  },
  recycleCenterDistance: {
    color: '#666',
  },
  icon: {
    marginRight: 8,
  },
});