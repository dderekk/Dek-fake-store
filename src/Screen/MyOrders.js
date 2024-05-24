import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Title } from '../component/Title';
import { Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchOrders, updateOrderStatus } from '../redux/ordersSlice';

const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const url = `http://${server}:3000`;

function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const loading = useSelector(state => state.orders.loading);
  const user = useSelector(state => state.user);
  const isFocused = useIsFocused();

  const [expandedOrders, setExpandedOrders] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  const fetchOrdersData = async () => {
    try {
      const response = await fetch(`${url}/orders/all`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (data.status === 'OK') {
        const parsedOrders = data.orders.map(order => ({
          ...order,
          order_items: JSON.parse(order.order_items)
        }));
        setOrders(parsedOrders);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      Alert.alert('Error', 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchOrders(user.token));
    }
  }, [isFocused, user.token, dispatch]);

  const handleUpdateOrderStatus = async (orderId, isPaid, isDelivered) => {
    try {
      await dispatch(updateOrderStatus({ orderId, isPaid, isDelivered, token: user.token })).unwrap();
      Alert.alert('Success', isDelivered ? 'Your order is delivered' : 'Your order is paid');
    } catch (error) {
      console.error('Error updating order status:', error.message);
      Alert.alert('Error', 'Failed to update the order status.');
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prevState => ({
      ...prevState,
      [orderId]: !prevState[orderId]
    }));
  };

  const toggleSectionExpansion = (section) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const renderOrderItem = ({ item }) => {
    const isExpanded = expandedOrders[item.id];

    return (
      <View style={styles.orderContainer}>
        <TouchableOpacity onPress={() => toggleOrderExpansion(item.id)} style={styles.orderHeader}>
          <Text style={styles.orderSummary}>Order ID: {item.id}  Items: {item.item_numbers}  Total: ${item.total_price / 100}</Text>
          <Ionicons name={isExpanded ? 'caret-up-outline' : 'caret-down-outline'} size={20} />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.orderDetails}>
            {Array.isArray(item.order_items) ? item.order_items.map((product, index) => (
              <View key={index} style={styles.productContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
                </View>
              </View>
            )) : (
              <Text style={styles.errorText}>Order items is not an array: {JSON.stringify(item.order_items)}</Text>
            )}
            {!item.is_paid && !item.is_delivered && (
              <TouchableOpacity onPress={() => handleUpdateOrderStatus(item.id, 1, 0)} style={styles.payButton}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
            {!!item.is_paid && !item.is_delivered && (
              <TouchableOpacity onPress={() => handleUpdateOrderStatus(item.id, 1, 1)} style={styles.receiveButton}>
                <Text style={styles.buttonText}>Receive</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderOrdersByStatus = (status, label) => {
    const filteredOrders = orders.filter(order => {
      if (status === 'new') return !order.is_paid && !order.is_delivered;
      if (status === 'paid') return order.is_paid && !order.is_delivered;
      if (status === 'delivered') return order.is_paid && order.is_delivered;
      return false;
    });

    const isExpanded = expandedSections[status];

    return (
      <View key={status} style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => toggleSectionExpansion(status)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{label} ({filteredOrders.length})</Text>
          <Ionicons name={isExpanded ? 'caret-up-outline' : 'caret-down-outline'} size={20} />
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={filteredOrders}
            keyExtractor={order => order.id.toString()}
            renderItem={renderOrderItem}
            nestedScrollEnabled
          />
        )}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  return (
    <FlatList
      data={[{ key: 'orders' }]}
      renderItem={() => (
        <View style={styles.container}>
          <Title text="My Orders" />
          {renderOrdersByStatus('new', 'New Orders')}
          {renderOrdersByStatus('paid', 'Paid Orders')}
          {renderOrdersByStatus('delivered', 'Delivered Orders')}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderSummary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDetails: {
    marginTop: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
    color: '#777',
  },
  errorText: {
    color: 'red',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  receiveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyOrders;
