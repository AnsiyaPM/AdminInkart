import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import colors from '../../common/colors';
import NavigationBack from '../../common/NavigationBack';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDimensionContext} from '../../context/Index';
import CustomButton from '../../components/CustomButton/Index';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../components/CustomTextInput/Index';
import Snackbar from 'react-native-snackbar';
import CustomDropdown from '../../components/CustomDropdown/Index';
import firestore from '@react-native-firebase/firestore';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const [orderStatus, setOrderStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setOrderStatus(order?.orderStatus);
    }
  }, [order]);

  console.log('Order Details', order);
  // console.log(item.id);

  const actionSheetRef = useRef(null);

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order?.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            setTimeout(() => {
              actionSheetRef.current?.hide();
              setOrderStatus(status);
              Snackbar.show({
                text: 'Order status is updated ',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white_level_1,
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {name: 'Orderd'},
    {name: 'Order in progress'},
    {name: 'Order packed'},
    {name: 'Order shipped'},
    {name: 'Out of delivery'},
    {name: 'Deliverd'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];

  return (
    <View style={responsiveStyle.container}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                color: colors.primaryGreen,
              }}>
              Update Order
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Text>
                <AntDesign name="closecircleo" size={30} color={colors.grey} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 20}}>
            <CustomDropdown
              data={statusData}
              setData={text => setStatus(text)}
            />

            <CustomButton
              text={'Upadate status'}
              width={'100%'}
              onPress={handleUpdateOrder}
            />
          </View>
        </View>
      </ActionSheet>

      <ScrollView
        style={responsiveStyle.scrollView}
        contentContainerStyle={responsiveStyle.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={50} color={colors.white} />
          <View style={responsiveStyle.greenTextBox}>
            <Text style={responsiveStyle.orderId}>
              Order Id: #{order?.orderId ?? 'UYTGH89'}
            </Text>
            <Text style={responsiveStyle.orderStatus}>{orderStatus ?? ''}</Text>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <Text style={responsiveStyle.title}>Items:</Text>
          {order?.cartItems &&
            order.cartItems.map((ele, index) => {
              return (
                <View key={index} style={responsiveStyle.mapStyle}>
                  <View style={responsiveStyle.mapInner}>
                    <Text style={responsiveStyle.quantity}>{ele.quantity}</Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={colors.black_level_1}
                  />

                  <View
                    style={{width: '55%', overflow: 'hidden', marginLeft: 10}}>
                    <Text style={responsiveStyle.name}>{ele.name}</Text>
                    <Text style={responsiveStyle.desc}>{ele.description}</Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text style={responsiveStyle.price}>₹{ele.price}</Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Details
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 20,
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            <View>
              <Text
                style={{
                  lineHeight: 25,
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Coupon Discount
              </Text>
              <Text style={responsiveStyle.textStyle}>Delivery</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={responsiveStyle.textStyle}>₹134</Text>
              <Text style={responsiveStyle.textStyle}>Apply Coupon</Text>
              <Text style={responsiveStyle.textStyle}>₹50.00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              ₹{order.totalAmount}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Address:
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            {order?.address}
          </Text>
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Method:
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="cc-visa" size={30} color={colors.black} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                **** **** **** 7876
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                {order?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 15,
          backgroundColor: colors.white,
        }}>
        <CustomButton
          text={'Upadate status'}
          width={'90%'}
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
