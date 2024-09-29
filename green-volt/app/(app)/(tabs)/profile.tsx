import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

type Campaign = {
  id: number;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap; // To match the Ionicons icon names
  type: 'internal' | 'affiliate';
  action?: string; // Optional, as it's not always defined
  brand?: string; // Optional, only used for affiliate campaigns
  discount?: string; // Optional, only used for affiliate campaigns
  link?: string; // Optional, only used for affiliate campaigns
}

export default function CampaignScreen() {
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Tree Plantation Drive',
      description: 'Plant a tree for every 1000 points redeemed.',
      icon: 'leaf-outline',
      type: 'internal',
      action: 'Participate',
    },
    {
      id: 2,
      name: 'EcoStore Recycling Challenge',
      description: 'Recycle 5 batteries and get 30% off on EcoStore products.',
      icon: 'battery-charging-outline',
      type: 'affiliate',
      brand: 'EcoStore',
      discount: '30%',
      link: 'https://ecostore.com/recycling-challenge',
    },
    {
      id: 3,
      name: 'GreenThreads Upcycling Workshop',
      description: 'Learn to upcycle old clothes and get 20% off on sustainable fashion.',
      icon: 'shirt-outline',
      type: 'affiliate',
      brand: 'GreenThreads',
      discount: '20%',
      link: 'https://greenthreads.com/upcycling-workshop',
    },
  ]

  const handleParticipate = (campaign: Campaign) => {
    if (campaign.type === 'affiliate' && campaign.link) {
      Linking.openURL(campaign.link)
    } else {
      // Handle internal campaign participation
      console.log(`Participating in ${campaign.name}`)
    }
  }

  const renderCampaignItem = (campaign: Campaign) => (
    <TouchableOpacity key={campaign.id} style={styles.campaignItem} onPress={() => handleParticipate(campaign)}>
      <View style={styles.campaignIcon}>
        <Ionicons name={campaign.icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles.campaignInfo}>
        <Text style={styles.campaignName}>{campaign.name}</Text>
        <Text style={styles.campaignDescription}>{campaign.description}</Text>
        {campaign.type === 'affiliate' && campaign.discount && campaign.brand && (
          <Text style={styles.affiliateInfo}>{campaign.discount} off at {campaign.brand}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.participateButton} onPress={() => handleParticipate(campaign)}>
        <Text style={styles.participateButtonText}>{campaign.action || 'Participate'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Eco-Friendly Campaigns</Text>
      <ScrollView style={styles.content}>
        <Image
          source={{ uri: 'https://example.com/eco-campaign-image.jpg' }}
          style={styles.campaignImage}
        />
        <Text style={styles.description}>
          Join our eco-friendly campaigns and make a positive impact on the environment. Participate in
          tree planting, recycling challenges, and sustainable fashion initiatives. Earn rewards and
          exclusive discounts while contributing to a greener planet!
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="leaf-outline" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>5,234</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>1,892</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Active Campaigns</Text>
        {campaigns.map(renderCampaignItem)}
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
  content: {
    paddingHorizontal: 20,
  },
  campaignImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  campaignItem: {
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
  campaignIcon: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  campaignDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  affiliateInfo: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  participateButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  participateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
