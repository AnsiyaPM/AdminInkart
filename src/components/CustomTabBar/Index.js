import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CustomTabBar = () => {
  const [active, setActive] = useState('Home'); //initially home active aavan
  const navigation = useNavigation();
  const activeSize = 36;
  const activeFamily = 'Lato-Bold';

  const handleNavigation = name => {
    setActive(name);
    navigation.navigate(name);
  };
  return (
    <View
      style={{
        height: 75,
        backgroundColor: colors.primaryGreen,
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Text>
          <AntDesign
            name="home"
            size={active === 'Home' ? activeSize : 30}
            color={colors.white}
            style={{alignSelf: 'center', marginBottom: 4}}
          />
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Home' ? activeFamily : 'Lato-Light',
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Products')}>
        <Text>
          <AntDesign
            name="inbox"
            size={30}
            color={colors.white}
            style={{alignSelf: 'center', marginBottom: 4}}
          />
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Products' ? activeFamily : 'Lato-Light',
          }}>
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Orders')}>
        <Text>
          <AntDesign
            name="database"
            size={30}
            color={colors.white}
            style={{alignSelf: 'center', marginBottom: 4}}
          />
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Orders' ? activeFamily : 'Lato-Light',
          }}>
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <Text>
          <AntDesign
            name="user"
            size={30}
            color={colors.white}
            style={{alignSelf: 'center', marginBottom: 4}}
          />
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Profile' ? activeFamily : 'Lato-Light',
          }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
