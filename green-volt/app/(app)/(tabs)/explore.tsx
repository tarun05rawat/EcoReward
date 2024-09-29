import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

// Define the Reward type
type Reward = {
  id: number;
  name: string;
  points: number;
  icon: string;
  type: 'product' | 'affiliate' | 'action' | 'giftcard';
  brand?: string;
  discount?: string;
  link?: string;
}

export default function RewardScreen() {
  const rewards: Reward[] = [
    { id: 1, name: 'Eco-friendly Water Bottle', points: 500, icon: 'water-outline', type: 'product' },
    { id: 2, name: 'Reusable Shopping Bag', points: 300, icon: 'bag-handle-outline', type: 'product' },
    { id: 3, name: 'Plant a Tree', points: 1000, icon: 'leaf-outline', type: 'action' },
    { id: 4, name: '$5 Gift Card', points: 2000, icon: 'card-outline', type: 'giftcard' },
    { 
      id: 5, 
      name: '20% off at EcoStore', 
      points: 800, 
      icon: 'pricetag-outline', 
      type: 'affiliate',
      brand: 'EcoStore',
      discount: '20%',
      link: 'https://ecostore.com/discount?code=RECYCLE20'
    },
    { 
      id: 6, 
      name: '15% off Sustainable Fashion', 
      points: 600, 
      icon: 'shirt-outline', 
      type: 'affiliate',
      brand: 'GreenThreads',
      discount: '15%',
      link: 'https://greenthreads.com/offer?code=BATTERY15'
    },
  ]

  const handleRedeem = (reward: Reward) => {
    if (reward.type === 'affiliate' && reward.link) {
      Linking.openURL(reward.link)
    } else {
      // Handle other reward types (product, action, giftcard)
      console.log(`Redeeming ${reward.name}`)
    }
  }

  const renderRewardItem = (reward: Reward) => (
    <TouchableOpacity key={reward.id} style={styles.rewardItem} onPress={() => handleRedeem(reward)}>
      <View style={styles.rewardIcon}>
        <Ionicons name={reward.icon as keyof typeof Ionicons.glyphMap} size={24} color="#4CAF50" />
      </View>
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardName}>{reward.name}</Text>
        <Text style={styles.rewardPoints}>{reward.points} points</Text>
        {reward.type === 'affiliate' && reward.discount && reward.brand && (
          <Text style={styles.affiliateInfo}>{reward.discount} off at {reward.brand}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.redeemButton} onPress={() => handleRedeem(reward)}>
        <Text style={styles.redeemButtonText}>
          {reward.type === 'affiliate' ? 'Get Discount' : 'Redeem'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Redeem Rewards</Text>
      <Text style={styles.pointsText}>Your Points: 2500</Text>
      <ScrollView style={styles.rewardsList}>
        {rewards.map(renderRewardItem)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  rewardsList: {
    paddingHorizontal: 20,
  },
  rewardItem: {
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
  rewardIcon: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#666',
  },
  affiliateInfo: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
