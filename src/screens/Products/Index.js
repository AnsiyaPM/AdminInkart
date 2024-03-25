import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import EmtyData from '../../common/EmtyData';
import CustomTextInput from '../../components/CustomTextInput/Index';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Alert} from 'react-native';

const Products = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const {width, height} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign name="plussquareo" size={30} color={colors.grey} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await firestore()
      .collection('Products')
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
          setProducts(objArray);
        }
      });
  };

  const Header = () => (
    <CustomTextInput
      width={'99%'}
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
      .collection('Products')
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
          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const handleDelete = async productData => {
    Alert.alert('Confirm Deletion', 'Do you want to delete this product', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await firestore()
            .collection('Products')
            .doc(productData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Product Deleted successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
          getProducts();
        },
      },
    ]);
  };

  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };

  return (
    <FlatList
      style={{flex: 1, margin: 15}}
      data={products}
      numColumns={2}
      extraData={products}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmtyData />}
      renderItem={({item, index}) => {
        if (item.username === 'admin') {
          return null;
        } else {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Product Details', {product: item})
              }
              style={{
                marginVertical: 8,
                width: '48%',
                height: height * 0.3,
                backgroundColor: colors.lght_grey,
                borderColor: colors.primaryGreen,
                borderWidth: 1,
                alignSelf: 'center',
                borderRadius: 15,
                alignItems: 'center',
                marginLeft: index % 2 === 1 ? 15 : 0,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather
                  name="edit"
                  size={25}
                  color={colors.black_level_2}
                  onPress={() => handleEdit(item)}
                />
                <AntDesign
                  name="delete"
                  size={25}
                  color={colors.black_level_2}
                  style={{marginLeft: 10}}
                  onPress={() => handleDelete(item)}
                />
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  // backgroundColor: colors.white,
                  width: '95%',
                  height: height * 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginVertical: 5,
                  marginTop: 30,
                }}>
                <Image
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../assets/images/user.png')
                  }
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                    borderRadius: 40,
                    overflow: 'hidden',
                  }}
                />
              </View>
              <View style={{marginLeft: 10, overflow: 'hidden', width: '75%'}}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'Lato-Bold',
                    fontSize: 20,
                    color: colors.primaryGreen,
                  }}>
                  {item?.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: colors.black1,
                  }}>
                  {item?.description}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Lato-Bold',
                    fontSize: 18,
                    color: colors.black_level_3,
                    lineHeight: 35,
                  }}>
                  ₹ {item?.price}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

export default Products;
