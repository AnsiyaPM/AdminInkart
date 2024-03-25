import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import colors from '../../common/colors';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './Style';
import CustomTextInput from '../../components/CustomTextInput/Index';
import ActionSheet from 'react-native-actions-sheet';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  console.log(product);
  const [currentActiveSections, setActiveSections] = useState([0]);
  const actionSheetRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Description ',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: '#000',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        <Text>
        <FontAwesome name="edit" size={30} color={colors.grey} />
        </Text>
      </TouchableOpacity>
    );
  };

  const DetailsArray = [
    {
      title: 'Manufacture details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      title: ' Product Disclaimer',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      title: 'Featurs and Details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
  ];

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderContent = sections => {
    return (
      <View>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 16,
            color: colors.grey,
          }}>
          {sections.content}
        </Text>
      </View>
    );
  };

  const _renderHeader = sections => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontFamily: 'Lato-Bold', fontSize: 18}}>
          {sections.title}
        </Text>
        <Text>
          <AntDesign name="down" size={25} color={colors.grey} />
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
       <ActionSheet ref={actionSheetRef}>
        <View>
          <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text>Hi, I am here.</Text>
        </View>
      </ActionSheet>
      <View style={{padding: 20}}>
        <Image
          source={{uri: product.image}}
          style={{width: '100%', height: 200, resizeMode: 'contain'}}
        />
      </View>

      <View style={{flex: 1, backgroundColor: colors.white, padding: 15}}>
        <Text
          style={{
            fontFamily: 'Lato-Black',
            fontSize: 22,
            color: colors.black,
            lineHeight: 45,
          }}>
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 20,
            color: colors.black_level_2,
          }}>
          {product.description}
        </Text>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 22,
            color: colors.black,
          }}>
          ₹{product.price} {''}
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.primaryGreen,
            }}>
            25% off
          </Text>
        </Text>
        <View style={{padding: 5}}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              color: colors.black,
              lineHeight: 45,
            }}>
            Product Details
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black,
            }}>
            {product.description}
          </Text>
        </View>

        <Accordion
          activeSections={currentActiveSections}
          sections={DetailsArray}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          underlayColor={'transparent'}
          sectionContainerStyle={{
            paddingVertical: 10,
            borderBottomColor: colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View>
          <Text
            style={{fontFamily: 'Lato-Bold', fontSize: 18, marginBottom: 10,marginVertical:20}}>
            Check Delivary
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.shadow,
              lineHeight: 25,
            }}>
            Enter pincode to check delivary date/pickup option
          </Text>
          <CustomTextInput
            placeholder={'Pin Code'}
            width={'100%'}
            border={true}
            handleText={() => {}}
            icon={<Text>Check</Text>}
          />
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: colors.shadow,
              lineHeight: 25,
            }}>
            Free Delivary on orders above 200.00
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: colors.shadow,
              lineHeight: 25,
            }}>
            Cash on delivary available
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: colors.shadow,
              lineHeight: 25,
            }}>
            Easy 21 days return and exchange
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
