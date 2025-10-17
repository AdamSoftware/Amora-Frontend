import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import HandleAPIRequest from '../components/HandleAPIRequest';
import UserHelper from '../helper/user';
import NotifyMessages from '../helper/NotifyMessages';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function SubscriptionLoading() {
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const plan = plans.find(p => p.Id === subscription?.PlanId);

  useEffect(() => {
    async function loadUser() {
      HandleAPIRequest.handleGetByUserIdRequest(
        "subscriptions",
        String(UserHelper.id),
        (data) => {
          setSubscription(data);
          setLoadingUser(false);
        },
        (error) => {
          console.error("Get user request failed:", error);
          setLoadingUser(false);
        }
      );
    }

    async function loadPlans() {
      HandleAPIRequest.HandleGetRequest(
        "plans",
        (data) => {
          setPlans(data);
          setLoadingPlans(false);
        },
        (error) => {
          console.error("Get plans request failed:", error);
          setLoadingPlans(false);
          NotifyMessages.notifyError("Failed to load plans data.");
        }
      );
    }

    loadUser();
    loadPlans();
  }, []);

  const loading = loadingUser || loadingPlans;

  const handleUpgradePress = () => {
    Alert.alert(
      "Upgrade Subscription",
      "Redirecting to upgrade page...",
      [{ text: "OK" }]
    );
    // TODO: handle actual upgrade flow here
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Loading your subscription...</Text>
      </View>
    );
  }

  if (!subscription) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Available Plans</Text>
        {plans.length === 0 ? (
          <Text style={styles.noPlansText}>No plans available at the moment.</Text>
        ) : (
          plans.map((plan) => (
            <LinearGradient
              key={plan.Id}
              colors={['#fff', '#f0f0f0']}
              style={styles.planCard}
            >
              <Text style={styles.planTitle}>{plan.PlanType}</Text>
              <Text style={styles.planPrice}>${plan.Price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.upgradeButton} onPress={() => Alert.alert("Upgrade", `Upgrade to ${plan.PlanType} plan`)}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Your Subscription</Text>
      <LinearGradient
        colors={['#f0f0f0', '#000']}
        style={styles.subscriptionCard}
      >
        <Text style={styles.planTitle}>{plan ? plan.PlanType : "Unknown Plan"}</Text>
        <Text style={styles.planPrice}>${plan ? plan.Price.toFixed(2) : "N/A"}</Text>
        <Text style={styles.planStatus}>Status: {subscription.Status}</Text>
        <Text style={styles.planRenewal}>Renewal: {new Date(subscription.NextPaymentDate).toLocaleDateString()}</Text>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradePress}>
          <Text style={styles.upgradeButtonText}>Upgrade</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#222',
  },
  noPlansText: {
    fontSize: 16,
    color: '#555',
  },
  planCard: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  subscriptionCard: {
    width: '100%',
    minHeight: height * 0.45,
    borderRadius: 25,
    paddingVertical: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    alignSelf: 'center',
    marginBottom: 20,
    top: 20,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#fff', 
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  planStatus: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  planRenewal: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  upgradeButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 15,
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

