// App.js
import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { CategoryScreen } from "./src/Screen/ProductsCategory";
import { Products } from "./src/Screen/Products";
import { Cart } from "./src/Screen/Cart";
import ProductDetail from "./src/Screen/ProductDetails";
import SignUp from './src/Screen/SignUp';
import SignIn from './src/Screen/SignIn';
import UserProfile from './src/Screen/UserProfile';
import MyOrders from './src/Screen/MyOrders';
import { fetchOrders } from './src/redux/ordersSlice';
import { setUser } from './src/redux/userSlice';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CategoryScreen} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  const user = useSelector(state => state.user);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchOrders(user.token)); // Fetch orders when the user logs in
    }
  }, [user.isLoggedIn, dispatch]);

  const handleProtectedNavigation = (routeName, navigation) => {
    if (!user.isLoggedIn) {
      Alert.alert(
        'Authentication required',
        'Please sign in or sign up to access this feature.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Profile')
          }
        ]
      );
      return false;
    }
    return true;
  };

  const newOrdersCount = orders.filter(order => !order.is_paid && !order.is_delivered).length;

  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="Product" 
        component={HomeStackNavigator} 
        listeners={({ navigation }) => ({
          tabPress: e => {
            if (!handleProtectedNavigation('Products', navigation)) {
              e.preventDefault();
            }
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="Shopping Cart" 
        component={Cart} 
        listeners={({ navigation }) => ({
          tabPress: e => {
            if (!handleProtectedNavigation('Shopping Cart', navigation)) {
              e.preventDefault();
            }
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
          tabBarBadge: user.isLoggedIn && cartQuantity > 0 ? cartQuantity : undefined
        }}
      />
      <Tabs.Screen 
        name="My Orders" 
        component={MyOrders} 
        listeners={({ navigation }) => ({
          tabPress: e => {
            if (!handleProtectedNavigation('My Orders', navigation)) {
              e.preventDefault();
            }
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
          tabBarBadge: user.isLoggedIn && newOrdersCount > 0 ? newOrdersCount : undefined
        }}
      />
      <Tabs.Screen 
        name="Profile" 
        component={user.isLoggedIn ? UserProfile : AuthStackNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
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

