import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import CustomTextInput from '../../components/CustomTextInput/Index';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const navigation = useNavigation();
  const [orders,setOrders] =useState(0);
  const [users,setUsers] =useState(0);
  const [products,setProducts] =useState(0);

  useEffect(()=>{
    getAllCount();
  },[]);

  const getAllCount = async ()=>{ // count set aayi home page il access cheyyan 
    const productRef=firestore().collection('Products').get();
    const userRef =firestore().collection('Users').get();
    const orderRef=firestore().collection('Orders').get();

    setOrders((await orderRef).size) // to get the count of each  
    setProducts((await productRef).size)
    setUsers((await userRef).size)
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/drawer.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            style={{
              width: 120,
              height: 80,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 15}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={{
          width: '95%',
          height: '25%',
          borderRadius: 15,
          backgroundColor: colors.category1,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          source={require('../../assets/images/order-banner.png')}
          style={{width: 90, height: 90, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 28,
              color: colors.black_level_3,
            }}>
            {orders}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            Orders
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={{
          width: '95%',
          height: '30%',
          borderRadius: 15,
          backgroundColor: colors.category2,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          source={require('../../assets/images/products.png')}
          style={{width: 90, height: 90, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 28,
              color: colors.black_level_3,
            }}>
            {products}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            Produts
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={{
          width: '95%',
          height: '30%',
          borderRadius: 15,
          backgroundColor: colors.category3,
          alignSelf: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 8,
        }}>
        <Image
          source={require('../../assets/images/man.png')}
          style={{width: 90, height: 90, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 28,
              color: colors.black_level_3,
            }}>
            {users}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black_level_3,
            }}>
            users
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
