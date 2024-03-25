import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import EmtyData from '../../common/EmtyData';
import CustomTextInput from '../../components/CustomTextInput/Index';
import moment from 'moment';
import NavigationBack from '../../common/NavigationBack';

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'no products found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextInput
      width={'95%'}
      border={true}
      value={searchText}
      placeholder={'Search here...'}
      onChangeText={text => handleSearch(text)}
      icon={
        <Image
          source={require('../../assets/images/search.png')}
          style={{width: 25, height: 25, resizeMode: 'contain'}}
        />
      }
    />
  );

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Orders')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };
  const dateFormate = time => {
   return moment(new Date(time)).format('MM DD YYYY, h:mm ');
  };

  return (
    <FlatList
      style={{flex: 1, margin: 15}}
      data={orders}
      extraData={orders}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmtyData />}
      renderItem={({item, index}) => {
        console.log(item);
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Order Details',{order:item})}
            style={{
              backgroundColor: colors.secondaryGreen,
              borderRadius: 15,
              padding: 15,
              overflow: 'hidden',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: colors.grey,
                borderBottomWidth: 1,
                paddingBottom: 15,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Lato-Bold',
                    fontSize: 16,
                    color: colors.black,
                  }}>
                 ID:# {item.orderId}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 14,
                    color: colors.primaryGreen,
                    overflow:'hidden'
                  }}>
                  Ordered on: {dateFormate(item?.created)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 14,
                    color: colors.grey,
                  }}>
                  {item?.address  ?? 'HA, 23A Rose Villa ,Banglore'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 14,
                    color: colors.grey,
                  }}>
                  Paid:{' '}
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      fontSize: 14,
                      color: colors.black,
                    }}>
                   ₹ {item.totalAmount}
                  </Text>
                  , Item:{' '}
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      fontSize: 14,
                      color: colors.black,
                    }}>
                    {item.quantity}
                  </Text>
                </Text>
              </View>
              <Image
                source={require('../../assets/images/map.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                  overflow: 'hidden',
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  color: colors.black_level_3,
                }}>
               {item?.orderStatus}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  color: colors.black_level_3,
                }}>
                Rate & Review Products
              </Text>
            </View>
          </TouchableOpacity>
        
        );
      }}
    />
  );
};

export default Orders;
