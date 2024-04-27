import { CategoryScreen } from "./src/Screen/ProductsCategory";
import { Products } from "./src/Screen/Products";
import { Cart } from "./src/Screen/Cart";
import { Ionicons } from '@expo/vector-icons';

// This is for navigation part
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetail from "./src/Screen/ProductDetails";


// Create navigators
const Drawer = createDrawerNavigator();
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

// Configure the Tabs as the main navigator
function App() {
  const num = 3

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Productss" component={HomeStackNavigator} options={{
          tabBarIcon: ()=>(<Ionicons name ="home"/>)
        }}/>
        <Tabs.Screen name="My Cart" component={Cart} options={{
          tabBarIcon:({size,color})=>(
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
          tabBarBadge: num || undefined,
        }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;

/*
// Drawer Navigator - root of the app
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Products" component={ProductsStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
*/