// Import necessary libraries
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import the screens used in the stack navigator
import { CategoryScreen} from '../Screen/ProductsCategory'
import { Products } from '../Screen/Products';               
import {ProductDetail} from '../Screen/ProductDetails';    // Adjust the path as needed

// Create the stack navigator
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={CategoryScreen}
        options={{ headerShown: false }}  // Optionally hide the header
      />
      <Stack.Screen 
        name="Products" 
        component={Products}
        options={{ title: 'Browse Products' }}  // Custom title for the products screen
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail}
        options={{ title: 'Product Details' }}  // Custom title for the product detail screen
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
