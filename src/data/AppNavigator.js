import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator'; // Assuming this path is correct
import Cart from '../Screen/Cart'; // Assuming Cart is directly used here

const Tabs = createBottomTabNavigator();

function AppNavigator() {
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Products" component={HomeStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen 
  name="Shopping Cart" 
  component={Cart} 
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="cart-outline" color={color} size={size} />
    ),
    tabBarBadge: cartQuantity > 0 ? cartQuantity : undefined
  }}
/>
    </Tabs.Navigator>
  );
}

export default AppNavigator;
