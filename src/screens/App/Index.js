import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../Login/Index';
import Home from '../Home/Index';
import {DimensionContextProvider} from '../../context/Index';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../store/store';
import Splash from '../Splash/Index';
import CustomDrawer from '../../components/CustomDrawer/Index';
import CustomTabBar from '../../components/CustomTabBar/Index';
import Products from '../Products/Index';
import Orders from '../Orders/Index';
import Profile from '../Profile/Index';
import Users from '../Users/Index';
import OrderDetails from '../OrderDetails/Index';
import ProductDetails from '../ProductDetails/Index';
import colors from '../../common/colors';
import CreateProduct from '../CreateProduct/Index';
import Banner from '../Banner/Index';
import Offers from '../Offers/Index';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [isLoggedIn]);

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          {loading ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              {isLoggedIn ? (
                <Stack.Screen name="SideBar" component={SideBar} />
              ) : (
                <Stack.Screen name="Login" component={Login} />
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const Drawer = createDrawerNavigator();
const SideBar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Footer" component={Footer} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const Footer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="StackNav">
      <Tab.Screen name="StackNav" component={StackNav} />
    </Tab.Navigator>
  );
};

const StackNavigartor = createNativeStackNavigator();
const StackNav = () => {
  return (
    <StackNavigartor.Navigator initialRouteName="Home">
      <StackNavigartor.Screen
        name="Home"
        component={Home}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
            height: 80,
          },
          headerTitleStyle: {
            fontFamily: 'Lato-Bold', // Specify your desired font family here
            fontsize: 22,
          },
          headerTintColor: colors.black_level_3,
        }}
      />
      <StackNavigartor.Screen name="Products" component={Products} />
      <StackNavigartor.Screen name="Orders" component={Orders} />
      <StackNavigartor.Screen name="Profile" component={Profile} />
      <StackNavigartor.Screen name="Users" component={Users} />
      <StackNavigartor.Screen name="Order Details" component={OrderDetails} />
      <StackNavigartor.Screen
        name="Product Details"
        component={ProductDetails}
      />
      <StackNavigartor.Screen name="CreateProduct" component={CreateProduct} />
      <StackNavigartor.Screen name="Banner" component={Banner} />
      <StackNavigartor.Screen name="Offers" component={Offers} />
    </StackNavigartor.Navigator>
  );
};

export default App;
