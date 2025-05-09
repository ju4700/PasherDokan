import React from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LogoutButton from '../../components/LogoutButton';

type RootStackParamList = {
  ShopkeeperDashboard: { shopId?: string };
  AddShop: undefined;
  AddProduct: { shopId: string };
  Login: undefined;
};

type ShopkeeperDashboardRouteProp = RouteProp<RootStackParamList, 'ShopkeeperDashboard'>;
type ShopkeeperDashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShopkeeperDashboard'>;

type Props = {
  route: ShopkeeperDashboardRouteProp;
  navigation: ShopkeeperDashboardNavigationProp;
};

const ShopkeeperDashboard: React.FC<Props> = ({ route, navigation }) => {
  const shopId = route.params?.shopId;

  const handleAddProduct = () => {
    if (!shopId) {
      Alert.alert('Error', 'Please create a shop first.');
      return;
    }
    navigation.navigate('AddProduct', { shopId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>PD</Text>
          </View>
          <Text style={styles.headerTitle}>Shopkeeper Dashboard</Text>
          <View style={styles.logoutButtonContainer}>
            <LogoutButton navigation={navigation} />
          </View>
        </View>

        <View style={styles.statusCard}>
          {shopId ? (
            <>
              <Text style={styles.statusTitle}>Shop Status</Text>
              <Text style={styles.statusActive}>Active</Text>
              <Text style={styles.shopIdText}>Shop ID: {shopId}</Text>
            </>
          ) : (
            <>
              <Text style={styles.statusTitle}>Shop Status</Text>
              <Text style={styles.statusInactive}>No Shop Created</Text>
              <Text style={styles.statusMessage}>Create a shop to start selling products</Text>
            </>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, shopId ? styles.secondaryButton : styles.primaryButton]}
            onPress={() => navigation.navigate('AddShop')}
          >
            <Text style={styles.actionButtonText}>
              {shopId ? 'Manage Shop Details' : 'Create a Shop'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton, !shopId && styles.disabledButton]}
            onPress={handleAddProduct}
          >
            <Text style={styles.actionButtonText}>Add New Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton, !shopId && styles.disabledButton]}
            onPress={() => shopId ? console.log('View inventory') : Alert.alert('Error', 'Please create a shop first.')}
          >
            <Text style={styles.actionButtonText}>View Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton, !shopId && styles.disabledButton]}
            onPress={() => shopId ? console.log('View orders') : Alert.alert('Error', 'Please create a shop first.')}
          >
            <Text style={styles.actionButtonText}>View Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a69bd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  logoutButtonContainer: {
    marginLeft: 'auto',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statusActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
  },
  statusInactive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 8,
  },
  statusMessage: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  shopIdText: {
    fontSize: 14,
    color: '#34495e',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#4a69bd',
  },
  secondaryButton: {
    backgroundColor: '#6a89cc',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    opacity: 0.7,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShopkeeperDashboard;
