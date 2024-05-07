import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CategoryScreen } from "./src/Screen/ProductsCategory";
import { Products } from "./src/Screen/Products";
import { Cart } from "./src/Screen/Cart";
import ProductDetail from "./src/Screen/ProductDetails";

// Create navigators
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={CategoryScreen} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  const cartQuantity = useSelector(state => state.cart.totalQuantity); // Correctly placed useSelector

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

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
