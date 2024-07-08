import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontSizeADJ from "./Functions/FontSizeADJ";

// Screens
import HomePage from "./Home/HomePage";
import SearchPage from "./Home/SearchPage";
import DetailPage from "./Home/DetailPage";
import FilterPage from "./Home/FilterPage";
import CategoryPage from "./Home/CategoryPage";

import CarePage from "./Care/CarePage";
import CareDetailPage from "./Care/CareDetailPage";

import CheckOutPage from "./Cart/CheckOutPage";
import CartPage from "./Cart/CartPage";

import AccountPage from "./Account/AccountPage";
import PaymentMethodPage from "./Account/PaymentMethodPage";
import OrderHistoryPage from "./Account/OrderHistoryPage";

import WishList from "./WishList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home Page"
    >
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Filter" component={FilterPage} />
      <Stack.Screen name="Category" component={CategoryPage} />
    </Stack.Navigator>
  );
}

function CareStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CarePage"
    >
      <Stack.Screen name="CarePage" component={CarePage} />
      <Stack.Screen name="CareDetailPage" component={CareDetailPage} />
    </Stack.Navigator>
  );
}

function CartStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CartPage"
    >
      <Stack.Screen name="CheckOutPage" component={CheckOutPage} />
      <Stack.Screen name="CartPage" component={CartPage} />
    </Stack.Navigator>
  );
}

function AccountStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AccountPage"
    >
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="PaymentMethodPage" component={PaymentMethodPage} />
      <Stack.Screen name="OrderHistoryPage" component={OrderHistoryPage} />
    </Stack.Navigator>
  );
}

function NavigationScreen() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Care":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Cart":
                iconName = focused ? "cart" : "cart-outline";
                break;
              case "Wishlist":
                iconName = focused ? "list" : "list-outline";
                break;
              case "Account":
                iconName = focused ? "person" : "person-outline";
                break;
              default:
                iconName = "circle";
                break;
            }

            return (
              <Ionicons
                name={iconName}
                size={FontSizeADJ(0.8)}
                color={focused ? "rgb(4, 104, 112)" : "grey"}
              />
            );
          },

          tabBarActiveTintColor: "rgb(4, 104, 112)",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingVertical: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: FontSizeADJ(0.38),
            paddingBottom: 10,
          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Care" component={CareStackNavigator} />
        <Tab.Screen name="Cart" component={CartStackNavigator} />
        <Tab.Screen name="Wishlist" component={WishList} />
        <Tab.Screen name="Account" component={AccountStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationScreen;
