// Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { removeItemFromCart, addItemToCart, clearItemFromCart } from '../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { Title } from '../component/Title';
import { Platform } from 'react-native';
import { fetchOrders } from '../redux/ordersSlice';

const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const url = `http://${server}:3000`;

export function Cart() {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (totalQuantity === 0) {
    return (
      <View style={styles.center}>
        <Title text="Shopping Cart" />
        <Text style={styles.emptyMessage}>Your shopping cart is empty</Text>
      </View>
    );
  }

  const handleCheckOut = async () => {
    console.log('Starting checkout process...');
    console.log('User ID:', user.id);
    console.log('Cart Items:', items);
    console.log('Total Amount:', totalAmount);

    try {
      const response = await fetch(`${url}/orders/neworder`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify({
          items: Object.values(items).map(item => ({
            prodID: item.id,
            price: item.price,
            quantity: item.quantity,
            title: item.title,
            image: item.image,
          }))
        }),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (data.status === 'OK') {
        Alert.alert('Order Created', 'Your order has been created successfully.');
        Object.keys(items).forEach(id => dispatch(clearItemFromCart(id)));
        dispatch(fetchOrders(user.token));
      } else {
        Alert.alert('Error', data.message || 'Failed to create the order.');
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      Alert.alert('Error', 'Failed to create the order.');
    }
  };

  return (
    <View style={styles.container}>
      <Title text="Shopping Cart" />
      <Text style={styles.summary}>Total Items: {totalQuantity} | Total Price: ${totalAmount.toFixed(2)}</Text>
      <FlatList
        data={Object.values(items)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemContent}>
              <Text style={styles.itemDescription}>{item.title} - ${item.price} (x{item.quantity})</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(addItemToCart(item))}>
                  <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                  if (item.quantity === 1) {
                    dispatch(clearItemFromCart(item.id));
                  } else {
                    dispatch(removeItemFromCart(item.id));
                  }
                }}>
                  <Ionicons name="remove-circle-outline" size={24} color="#f44336" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut}>
        <Text style={styles.checkoutButtonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  center: {
    padding:20,
    flex: 1,
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemDescription: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
    padding: 8,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
